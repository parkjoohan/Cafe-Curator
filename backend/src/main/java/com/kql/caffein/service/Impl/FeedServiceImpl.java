package com.kql.caffein.service.Impl;

import com.kql.caffein.converter.CategoryDataConverter;
import com.kql.caffein.dto.Feed.*;
import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.entity.Cafe;
import com.kql.caffein.entity.CategoryLog;
import com.kql.caffein.entity.Feed.*;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.*;
import com.kql.caffein.service.FeedService;
import com.kql.caffein.service.S3Service;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.locationtech.proj4j.BasicCoordinateTransform;
import org.locationtech.proj4j.CRSFactory;
import org.locationtech.proj4j.CoordinateReferenceSystem;
import org.locationtech.proj4j.ProjCoordinate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class FeedServiceImpl implements FeedService {

    @Autowired
    FeedRepository feedRepository;
    @Autowired
    FileRepository fileRepository;
    @Autowired
    FeedsRepository feedsRepository;
    @Autowired
    FeedLikeRepository feedLikeRepository;
    @Autowired
    BookmarkRepository bookmarkRepository;
    @Autowired
    UserDetailRepository userDetailRepository;
    @Autowired
    FollowRepository followRepository;
    @Autowired
    CafeRepository cafeRepository;
    @Autowired
    CategoryLogRepository categoryLogRepository;
    @Autowired
    S3Service s3Service;
    @Autowired
    FollowServiceImpl followService;

    //피드 등록
    @Override
    @Transactional
    public void feedRegister(FeedRegisterDto feedDto, MultipartFile[] files) throws Exception{
        
        if(files == null)
            throw new NullPointerException("이미지를 등록하세요");

        for(MultipartFile mfile : files){ //파일 확장자 검사
            String originFileName = mfile.getOriginalFilename();
            String extension = originFileName.substring(originFileName.length()-3);

            if(!(extension.equals("jpg") || extension.equals("png")))
                throw new FileUploadException("파일 확장자가 jpg나 png가 아닙니다.");
        }

        Integer cafeId = null;
        if(feedDto.getCafeName() != null) //카페를 등록했다면
            cafeId = addCafe(feedDto.getCafeX(), feedDto.getCafeY(), feedDto.getCafeName(), feedDto.getCafeAddress());

        Feed feed = feedDto.toEntity();
        feed.setCafeId(cafeId);
        feedRepository.save(feed); //DB에 내용 저장

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기

            File file =  File.builder().filePath(imgURL).feed(feed).build();

            fileRepository.save(file); //DB에 파일 저장
        }

        addFeedList(feed.getFeedNo(), feed.getUserNo()); //피드 목록에 추가

        if(feedDto.getCafeName() != null){ //카페를 등록했다면
            for(String category : feed.getCategoryList()){
                CategoryLog categoryLog = CategoryLog.builder()
                        .cafeId(cafeId)
                        .category(category)
                        .feedNo(feed.getFeedNo())
                        .build();

                categoryLogRepository.save(categoryLog); //카테고리 로그 추가

                //캐시?
            }
        }
    }

    //유저의 피드 목록에 피드 추가
    @Override
    public void addFeedList(int feedNo, String userNo) throws Exception{

        Optional<Feeds> feeds = feedsRepository.findById(userNo);

        if(feeds.isEmpty()){ //첫 피드라면
            List<Integer> feedList = new ArrayList<>();
            feedList.add(feedNo);
            feedsRepository.save(Feeds.builder().userNo(userNo).feedList(feedList).build());
        }
        else{
            List<Integer> feedList  = feeds.get().getFeedList(); //유저의 피드 목록
            feedList.add(feedNo);
            feeds.get().setFeedList(feedList);
            feedsRepository.save(feeds.get());
        }
    }

    //피드 삭제
    @Override
    @Transactional
    public void feedDelete(int feedNo, String userNo) throws Exception{

        Optional<Feed> feed = feedRepository.findById(feedNo);
        if(feed.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        if(!userNo.equals(feed.get().getUserNo()))
            throw new Exception("피드 작성자가 아닙니다");

        for(File file : feed.get().getFiles()) //S3에서 파일 삭제
            s3Service.delete(file.getFilePath());

        removeFeedList(feedNo, userNo); //피드 목록에서 삭제
        feedRepository.deleteById(feedNo); //피드 삭제

        //카테고리 로그에서 삭제(cascade)
        //캐시?
    }

    //유저의 피드 목록에서 피드 삭제
    @Override
    public void removeFeedList(int feedNo, String userNo) throws Exception{

        Feeds feeds = feedsRepository.getById(userNo);
        List<Integer> feedList  = feeds.getFeedList(); //나의 피드 목록
        feedList.remove(Integer.valueOf(feedNo));
        feeds.setFeedList(feedList);
        feedsRepository.save(feeds);
    }

    //피드 상세보기
    @Override
    @Transactional
    public FeedDetailDto feedDetail(int feedNo, String userNo) throws Exception{

        Optional<Feed> obj = feedRepository.findById(feedNo);
        if(obj.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        Feed feed = obj.get();
        UserDetail feedUser = userDetailRepository.findById(feed.getUserNo()).get(); //피드 작성자의 정보

        List<FileDto> files = new ArrayList<>();
        for(File file : feed.getFiles() )
            files.add(new FileDto(file.getFileNo(), file.getFilePath()));

        FeedDetailDto feedDto = FeedDetailDto.builder()
                .feedNo(feed.getFeedNo())
                .content(feed.getContent())
                .regTime(feed.getRegTime())
                .cafeId(feed.getCafeId())
                .cafeName(feed.getCafeName())
                .categoryList(feed.getCategoryList())
                .likeCount(feed.getLikeCount())
                .commentCount(feed.getCommentCount())
                .userId(feedUser.getUserId())
                .userPicture(feedUser.getPicture())
                .files(files)
                .liked(feedLikeState(feedNo, userNo)) //좋아요 상태 확인
                .marked(BookmarkState(feedNo, userNo)) //북마크 상태 확인
                .build();

        return feedDto;
    }

    //피드 수정
    @Override
    @Transactional
    public void feedModify(String userNo, FeedModifyDto feedDto, MultipartFile[] files) throws Exception{

        Optional<Feed> obj = feedRepository.findById(feedDto.getFeedNo());
        if(obj.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        Feed feed = obj.get(); //피드 가져오기

        String feedUserNo = feed.getUserNo();
        if(!userNo.equals(feedUserNo))
            throw new Exception("피드 작성자가 아닙니다");

        //기존 사진을 다 삭제하고 새로운 사진을 올리지 않은 경우
        if(files == null && feed.getFiles().size() == feedDto.getDeletedFileList().size())
            throw new NullPointerException("이미지를 등록하세요");

        if(files != null){ //파일 확장자 검사
            for(MultipartFile mfile : files){
                String originFileName = mfile.getOriginalFilename();
                String extension = originFileName.substring(originFileName.length()-3);

                if(!(extension.equals("jpg") || extension.equals("png")))
                    throw new FileUploadException("파일 확장자가 jpg나 png가 아닙니다.");
            }
        }

        for(int fileNo : feedDto.getDeletedFileList()){ //기존 파일 삭제
            s3Service.delete(fileRepository.findById(fileNo).get().getFilePath()); //S3
            fileRepository.deleteById(fileNo); //DB
        }

        if(files != null){ //새로운 파일 저장
            for (MultipartFile mfile : files) {
                String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기

                File file =  File.builder()
                        .filePath(imgURL)
                        .feed(feed)
                        .build();

                fileRepository.save(file); //DB에 파일 저장
            }
        }

        /*
        * 1. 기존에 등록한 카페에서 변동이 없는 경우(cafeModified : false)
        * 2. 기존 카페를 삭제하는 경우
        * 3. 기존 카페를 다른 카페로 수정하는 경우
        * 4. 카페를 새롭게 추가하는 경우
        * */

        Integer cafeId = feed.getCafeId();
        if(feedDto.isCafeModified()){
            if(feedDto.getCafeName() == null){ //2번
                cafeId = null;
                feed.setCafeId(null);
                feed.setCafeName(null);
            }
            else{ //3,4번
                cafeId = addCafe(feedDto.getCafeX(), feedDto.getCafeY(), feedDto.getCafeName(), feedDto.getCafeAddress());
                feed.setCafeId(cafeId);
                feed.setCafeName(feedDto.getCafeName());
            }
        }

        feed.setContent(feedDto.getContent()); //내용 수정
        feed.setCategoryList(feedDto.getCategoryList()); //카테고리 수정
        feedRepository.save(feed);

        //카테고리 로그 재등록
        categoryLogRepository.deleteByFeedNo(feed.getFeedNo()); //기존 데이터 삭제
        if(cafeId != null){ //등록한 카페가 있는 경우에만
            for(String category : feed.getCategoryList()){
                CategoryLog categoryLog = CategoryLog.builder()
                        .cafeId(cafeId)
                        .category(category)
                        .feedNo(feed.getFeedNo())
                        .build();

                categoryLogRepository.save(categoryLog); //카테고리 로그 추가

                //캐시?
            }
        }
    }

    //피드 좋아요 상태
    @Override
    public boolean feedLikeState(int feedNo, String userNo){
        return feedLikeRepository.findById(new FeedLikeId(feedNo, userNo)).isPresent();
    }

    //피드 좋아요 컨트롤
    @Override
    public String feedLikeControl(int feedNo, String userNo) throws Exception {

        Optional<Feed> obj = feedRepository.findById(feedNo);
        if (obj.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        Feed feed = obj.get();

        Optional<Optional<FeedLike>> feedLike = Optional.ofNullable(feedLikeRepository.findById(new FeedLikeId(feedNo, userNo)));
        if (feedLike.get().isEmpty()) {
            feedLikeRepository.save(new FeedLike(new FeedLikeId(feedNo, userNo)));

            feed.setLikeCount(feed.getLikeCount() + 1); //피드 좋아요 카운트 증가
            feedRepository.save(feed);
            return ("ADD LIKE");
        } else {
            feedLikeRepository.deleteById(new FeedLikeId(feedNo, userNo));

            feed.setLikeCount(feed.getLikeCount() - 1); //피드 좋아요 카운트 감소
            feedRepository.save(feed);
            return ("DELETE LIKE");
        }
    }

    //피드 북마크 상태
    @Override
    public boolean BookmarkState(int feedNo, String userNo){
        return bookmarkRepository.findById(new BookmarkId(feedNo, userNo)).isPresent();
    }

    //피드 북마크 컨트롤
    @Override
    public String feedBookmarkControl(int feedNo, String userNo) throws Exception {

        Optional<Feed> obj = feedRepository.findById(feedNo);
        if (obj.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        Feed feed = obj.get();

        Optional<Optional<Bookmark>> bookmark = Optional.ofNullable(bookmarkRepository.findById(new BookmarkId(feedNo, userNo)));
        if (bookmark.get().isEmpty()) {
            bookmarkRepository.save(new Bookmark(new BookmarkId(feedNo, userNo)));
            return ("ADD BOOKMARK");
        } else {
            bookmarkRepository.deleteById(new BookmarkId(feedNo, userNo));
            return ("DELETE BOOKMARK");
        }
    }

    //개인 피드 목록(feeds 테이블)
    @Override
    @Transactional
    public List feedListWithPaging(String feedUserNo, String userNo, String type, int lastFeedNo, int size) throws Exception{

        Optional<Feeds> feeds = feedsRepository.findById(feedUserNo);
        if(feeds.isEmpty()) //feedUser가 작성한 피드 없음
            return null;

        List<Integer> feedList  = feeds.get().getFeedList(); //feedUser의 피드 목록

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, feedList,
                PageRequest.of(0, size)); //페이지네이션을 위한 PageRequest, 페이지는 0으로 고정

        if(type.equals("blog"))
            return makeBlogDtoList(f.getContent(), userNo);
        else
            return makeFeedDtoList(f.getContent(), userNo);
    }

    //북마크한 피드 목록
    @Override
    @Transactional
    public List bookmarkListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{

        Optional<List<Integer>> bookmarkList = bookmarkRepository.getBookmarkList(userNo);

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, bookmarkList.get(), PageRequest.of(0, size));

        if(type.equals("blog"))
            return makeBlogDtoList(f.getContent(), userNo);
        else
            return makeFeedDtoList(f.getContent(), userNo);
    }

    //좋아요 누른 피드 목록
    @Override
    @Transactional
    public List likeListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{

        Optional<List<Integer>> likeList = feedLikeRepository.getLikeList(userNo);

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, likeList.get(), PageRequest.of(0, size));

        if(type.equals("blog"))
            return makeBlogDtoList(f.getContent(), userNo);
        else
            return makeFeedDtoList(f.getContent(), userNo);
    }

    //메인 피드 목록
    @Override
    @Transactional
    public List mainFeedListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{
        
        List<Feed> mainFeedList = null;
        
        if(userNo == null) //비회원
            mainFeedList = feedRepository.getRandomFeedList(lastFeedNo, size); //랜덤하게 조회

        else{ //본인 게시물 + 팔로잉 게시물 + 추천 게시물
            List<String> followingList = followRepository.getFollowingList(userNo); //해당 유저의 팔로잉 리스트
            followingList.add(userNo); //본인 게시물 포함

            //임시 관심사
            List<String> categoryList = new ArrayList<>();
            categoryList.add("공부하기 좋은");
            categoryList.add("테마카페");
//            List<String> categoryList = userDetailRepository.findById(userNo).get().getCategoryList();

            //CategoryDataConverter로 List<String> -> json 변환 필요!
            Page<Feed> f = feedRepository.getMainFeedList(new CategoryDataConverter().convertToDatabaseColumn(categoryList), followingList,
                                                lastFeedNo, PageRequest.of(0,size));
            mainFeedList = f.getContent();
        }

        if(type.equals("blog"))
            return makeBlogDtoList(mainFeedList, userNo);
        else
            return makeFeedDtoList(mainFeedList, userNo);
    }

    //목록 조회 응답 DtoList (블로그 형식)
    @Override
    public List<BlogResDto> makeBlogDtoList(List<Feed> list, String userNo){
        List<BlogResDto> feedDtoList = new ArrayList<>();

        for(Feed feed : list){
            UserDetail feedUser = userDetailRepository.findById(feed.getUserNo()).get();
            File file = feed.getFiles().get(0); //대표 사진만 포함

            BlogResDto feedDto = BlogResDto.builder()
                    .feedNo(feed.getFeedNo())
                    .content(feed.getContent())
                    .cafeName(feed.getCafeName())
                    .categoryList(feed.getCategoryList())
                    .likeCount(feed.getLikeCount())
                    .userId(feedUser.getUserId())
                    .userPicture(feedUser.getPicture())
                    .file(new FileDto(file.getFileNo(), file.getFilePath()))
                    .liked(feedLikeState(feed.getFeedNo(), userNo))
                    .build();
            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }

    //목록 조회 응답 DtoList (피드 형식)
    @Override
    public List<FeedResDto> makeFeedDtoList(List<Feed> list, String userNo){
        List<FeedResDto> feedDtoList = new ArrayList<>();

        for(Feed feed : list){
            String feedUserId = userDetailRepository.findById(feed.getUserNo()).get().getUserId();
            File file = feed.getFiles().get(0); //대표 사진만 포함

            FeedResDto feedDto = FeedResDto.builder()
                    .feedNo(feed.getFeedNo())
                    .likeCount(feed.getLikeCount())
                    .file(new FileDto(file.getFileNo(), file.getFilePath()))
                    .liked(feedLikeState(feed.getFeedNo(), userNo))
                    .build();
            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }

    @Override
    public List<FollowDto> feedLikeUserList(String userNo, int feedNo, String lastUserNo, int size) {
        if(lastUserNo == null) lastUserNo = "z";
        PageRequest pageRequest = PageRequest.of(0,size);
        Page<FeedLike> userList = feedLikeRepository.findByFeedNoAndUserNoLessThanOrderByUserNoDesc(feedNo,lastUserNo,pageRequest);

        List<FollowDto> list = new ArrayList<>();
        for(FeedLike user : userList) {
            String no = user.getFeedLikeId().getUserNo();
            UserDetail userDetail = userDetailRepository.findById(no).get();

            if(no.equals(userNo)) continue;
            list.add(new FollowDto(no, userDetail.getUserId(), userDetail.getPicture(), followService.checkFollow(userNo,no)));
        }
        return list;
    }

    @Override
    public int addCafe(double cafeX, double cafeY, String cafeName, String cafeAddress){
        CRSFactory factory = new CRSFactory();
        CoordinateReferenceSystem srcCrs = factory.createFromName("EPSG:5179");
        CoordinateReferenceSystem dstCrs = factory.createFromName("EPSG:4326");
        BasicCoordinateTransform transform = new BasicCoordinateTransform(srcCrs, dstCrs);
        ProjCoordinate srcCoord = new ProjCoordinate(cafeX, cafeY);
        ProjCoordinate dstCoord = new ProjCoordinate();
        transform.transform(srcCoord, dstCoord); //좌표계 변환
//        System.out.println("좌표 변환 >> " + dstCoord.x + " " + dstCoord.y);

        String cafeLng = String.valueOf(dstCoord.x);
        String cafeLat = String.valueOf(dstCoord.y);

        int cafeId = 0;
        Optional<Cafe> cafe = cafeRepository.findByCafeLngAndCafeLat(cafeLng, cafeLat);
        if(cafe.isEmpty()){
            Cafe cafeEntity = Cafe.builder()
                    .cafeName(cafeName)
                    .cafeAddress(cafeAddress)
                    .cafeLng(cafeLng)
                    .cafeLat(cafeLat)
                    .build();
            cafeRepository.save(cafeEntity); //카페 테이블에 존재하지 않는다면 추가
            return cafeEntity.getCafeId();
        }
        else
            return cafe.get().getCafeId();
    }
}