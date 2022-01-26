package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.Feed.*;
import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.entity.Cafe;
import com.kql.caffein.entity.CategoryLog;
import com.kql.caffein.entity.Comment.CommentLike;
import com.kql.caffein.entity.Feed.*;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.*;
import com.kql.caffein.service.FeedService;
import com.kql.caffein.service.S3Service;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
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

        Feed feed = feedDto.toEntity();
        feedRepository.save(feed); //DB에 내용 저장

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기

            File file =  File.builder()
                    .filePath(imgURL)
                    .feed(feed)
                    .build();

            fileRepository.save(file); //DB에 파일 저장
        }

        addFeedList(feed.getFeedNo(), feed.getUserNo()); //피드 목록에 추가

        int cafeId = 0;
        Optional<Cafe> cafe = cafeRepository.findByName(feedDto.getCafeName());
        if(cafe.isEmpty()){
            Cafe cafeEntity = Cafe.builder().name(feedDto.getCafeName()).build();
            cafeRepository.save(cafeEntity); //카페 테이블에 존재하지 않는다면 추가
            cafeId = cafeEntity.getCafeId();
        }
        else
            cafeId = cafe.get().getCafeId();

        for(String category : feed.getCategoryList()){
            System.out.println(category + " " + cafeId + " " + feed.getFeedNo());
            CategoryLog categoryLog = CategoryLog.builder()
                    .cafeId(cafeId)
                    .category(category)
                    .feedNo(feed.getFeedNo())
                    .build();

            categoryLogRepository.save(categoryLog); //카테고리 로그 추가

            //캐시?
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

        //캐시?
        //카테고리 로그에서 삭제
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
        String feedUserId = userDetailRepository.findById(feed.getUserNo()).get().getUserId(); //피드 작성자의 userId

        List<FileDto> files = new ArrayList<>();
        for(File file : feed.getFiles() )
            files.add(new FileDto(file.getFileNo(), file.getFilePath()));

        FeedDetailDto feedDto = FeedDetailDto.builder()
                .feedNo(feed.getFeedNo())
                .content(feed.getContent())
                .regTime(feed.getRegTime())
                .cafeName(feed.getCafeName())
                .categoryList(feed.getCategoryList())
                .likeCount(feed.getLikeCount())
                .commentCount(feed.getCommentCount())
                .userId(feedUserId) //프로필 사진 추가!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

        Feed feed = obj.get();

        String feedUserNo = feed.getUserNo();
        if(!userNo.equals(feedUserNo))
            throw new Exception("피드 작성자가 아닙니다");

        //기존 사진을 다 삭제하고 새로운 사진을 올리지 않은 경우
        if(files == null && feed.getFiles().size() == feedDto.getDeleteList().size())
            throw new NullPointerException("이미지를 등록하세요");

        if(files != null){ //파일 확장자 검사
            for(MultipartFile mfile : files){
                String originFileName = mfile.getOriginalFilename();
                String extension = originFileName.substring(originFileName.length()-3);

                if(!(extension.equals("jpg") || extension.equals("png")))
                    throw new FileUploadException("파일 확장자가 jpg나 png가 아닙니다.");
            }
        }

        //기존 파일 삭제
        for(int fileNo : feedDto.getDeleteList()){
            s3Service.delete(fileRepository.findById(fileNo).get().getFilePath()); //S3
            fileRepository.deleteById(fileNo); //DB
        }

        //내용 수정
        feed.setContent(feedDto.getContent());
        feed.setCafeName(feedDto.getCafeName());
        feed.setCategoryList(feedDto.getCategoryList());
        feedRepository.save(feed);

        //카페 아이디 or 카테고리 목록 수정 -> 카테고리 로그, 캐시 영향

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
            return makeBlogDtoList(f, userNo);
        else
            return makeFeedDtoList(f, userNo);
    }

    //북마크한 피드 목록
    @Override
    @Transactional
    public List bookmarkListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{

        Optional<List<Integer>> bookmarkList = bookmarkRepository.getBookmarkList(userNo);

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, bookmarkList.get(), PageRequest.of(0, size));

        if(type.equals("blog"))
            return makeBlogDtoList(f, userNo);
        else
            return makeFeedDtoList(f, userNo);
    }

    //좋아요 누른 피드 목록
    @Override
    @Transactional
    public List likeListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{

        Optional<List<Integer>> likeList = feedLikeRepository.getLikeList(userNo);

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, likeList.get(), PageRequest.of(0, size));

        if(type.equals("blog"))
            return makeBlogDtoList(f, userNo);
        else
            return makeFeedDtoList(f, userNo);
    }

    //메인 피드 목록
    @Override
    @Transactional
    public List mainFeedListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception{

        Page<Feed> f;
        if(userNo == null) //비회원
            f = feedRepository.findByFeedNoLessThanOrderByFeedNoDesc(lastFeedNo, PageRequest.of(0, size)); //전체 게시글 조회 가 아니라 랜덤!!!!!!!!!
        else{ //팔로잉 게시물 + 본인 게시물 + 추천 게시물
            //오 이걸 어떻게 하지 ㅎㅎ
            Optional<List<String>> followingList = followRepository.getFollowingList(userNo);
            f = feedRepository.findByUserNoInAndFeedNoLessThanOrderByFeedNoDesc(followingList.get(), lastFeedNo, PageRequest.of(0,size));
        }

        if(type.equals("blog"))
            return makeBlogDtoList(f, userNo);
        else
            return makeFeedDtoList(f, userNo);
    }

    //목록 조회 응답 DtoList (블로그 형식)
    @Override
    public List<BlogResDto> makeBlogDtoList(Page<Feed> list, String userNo){
        List<BlogResDto> feedDtoList = new ArrayList<>();

        for(Feed feed : list){
            UserDetail feedUser = userDetailRepository.findById(feed.getUserNo()).get();
            File file = feed.getFiles().get(0); //대표 사진만 포함

            BlogResDto feedDto = BlogResDto.builder()
                    .feedNo(feed.getFeedNo())
                    .content(feed.getContent())
                    .regTime(feed.getRegTime())
                    .cafeName(feed.getCafeName())
                    .categoryList(feed.getCategoryList())
                    .likeCount(feed.getLikeCount())
                    .commentCount(feed.getCommentCount())
                    .userId(feedUser.getUserId())
                    .userPicture(feedUser.getPicture())
                    .file(new FileDto(file.getFileNo(), file.getFilePath()))
                    .liked(feedLikeState(feed.getFeedNo(), userNo))
                    .marked(BookmarkState(feed.getFeedNo(), userNo))
                    .build();
            feedDtoList.add(feedDto);
        }
        return feedDtoList;
    }

    //목록 조회 응답 DtoList (피드 형식)
    @Override
    public List<FeedResDto> makeFeedDtoList(Page<Feed> list, String userNo){
        List<FeedResDto> feedDtoList = new ArrayList<>();

        for(Feed feed : list){
            String feedUserId = userDetailRepository.findById(feed.getUserNo()).get().getUserId();
            File file = feed.getFiles().get(0); //대표 사진만 포함

            FeedResDto feedDto = FeedResDto.builder()
                    .feedNo(feed.getFeedNo())
                    .likeCount(feed.getLikeCount())
                    .commentCount(feed.getCommentCount())
                    .file(new FileDto(file.getFileNo(), file.getFilePath()))
                    .liked(feedLikeState(feed.getFeedNo(), userNo))
                    .marked(BookmarkState(feed.getFeedNo(), userNo))
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
}