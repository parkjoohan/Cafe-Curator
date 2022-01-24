package com.kql.caffein.service;

import com.kql.caffein.dto.*;
import com.kql.caffein.entity.*;
import com.kql.caffein.repository.*;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class FeedServiceImpl implements FeedService{

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
    S3Service s3Service;

    //피드 등록
    @Override
    @Transactional
    public void feedRegister(FeedRegisterDto feedDto, MultipartFile[] files) throws Exception{

        if(files == null)
            throw new NullPointerException("이미지를 등록하세요");

        //파일 확장자 검사 먼저
        for(MultipartFile mfile : files){
            String originFileName = mfile.getOriginalFilename();
            String extension = originFileName.substring(originFileName.length()-3);

            //System.out.println("content type >> " + mfile.getContentType());

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

        //카테고리 로그 추가
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

        String feedUserNo = feed.get().getUserNo();
        if(!userNo.equals(feedUserNo))
            throw new Exception("피드 작성자가 아닙니다");

        //S3에서 파일 삭제
        for(File file : feedRepository.getById(feedNo).getFiles())
            s3Service.delete(file.getFilePath());

        removeFeedList(feedNo, userNo); //피드 목록에서 삭제
        feedRepository.deleteById(feedNo); //피드 삭제

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
        String feedUserNo = feed.getUserNo();
        String feedUserId = userDetailRepository.findByUserNo(feedUserNo).getUserId(); //피드 작성자의 userId

        List<FileDto> files = new ArrayList<>();
        for(File file : feed.getFiles() )
            files.add(new FileDto(file.getFileNo(), file.getFilePath()));

        FeedDetailDto feedDto = FeedDetailDto.builder()
                .feedNo(feed.getFeedNo())
                .content(feed.getContent())
                .regTime(feed.getRegTime())
                .cafeId(feed.getCafeId())
                .categoryList(feed.getCategoryList())
                .likeCount(feed.getLikeCount())
                .commentCount(feed.getCommentCount())
                .userId(feedUserId)
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

        //파일 확장자 검사
        if(files != null){
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
        feed.setCafeId(feedDto.getCafeId());
        feed.setCategoryList(feedDto.getCategoryList());
        feedRepository.save(feed);

        //카페 아이디 or 카테고리 목록 수정 -> 카테고리 로그, 캐시 영향

        //새로운 파일 저장
        if(files != null){
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

        Optional<Optional<FeedLike>> feedLike = Optional.ofNullable(feedLikeRepository.findById(new FeedLikeId(feedNo, userNo)));
        if(feedLike.get().isEmpty()) //feed_like 테이블에 존재하지 않는다면
            return false;
        else
            return true;
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

        Optional<Optional<Bookmark>> bookmark = Optional.ofNullable(bookmarkRepository.findById(new BookmarkId(feedNo, userNo)));
        if(bookmark.get().isEmpty()) //bookmark 테이블에 존재하지 않는다면
            return false;
        else
            return true;
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
            return new ArrayList<>(); //빈 리스트 return

        List<Integer> feedList  = feeds.get().getFeedList(); //feedUser의 피드 목록
//        System.out.println("피드 목록 : " + feedList);

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
//        System.out.println("북마크 목록 : " + bookmarkList.get());

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, bookmarkList.get(),
                PageRequest.of(0, size)); //페이지네이션을 위한 PageRequest, 페이지는 0으로 고정

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
//        System.out.println("북마크 목록 : " + bookmarkList.get());

        Page<Feed> f = feedRepository.findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(lastFeedNo, likeList.get(),
                PageRequest.of(0, size)); //페이지네이션을 위한 PageRequest, 페이지는 0으로 고정

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
            String feedUserId = userDetailRepository.findByUserNo(feed.getUserNo()).getUserId();
            File file = feed.getFiles().get(0); //대표 사진만 포함

            BlogResDto feedDto = BlogResDto.builder()
                    .feedNo(feed.getFeedNo())
                    .content(feed.getContent())
                    .regTime(feed.getRegTime())
                    .cafeId(feed.getCafeId())
                    .categoryList(feed.getCategoryList())
                    .likeCount(feed.getLikeCount())
                    .commentCount(feed.getCommentCount())
                    .userId(feedUserId)
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
            String feedUserId = userDetailRepository.findByUserNo(feed.getUserNo()).getUserId();
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
}