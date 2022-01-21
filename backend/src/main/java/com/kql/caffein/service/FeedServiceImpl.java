package com.kql.caffein.service;

import com.kql.caffein.dto.*;
import com.kql.caffein.entity.*;
import com.kql.caffein.repository.*;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        feedRepository.save(feed); //DB에 내용 먼저 저장

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

        System.out.println("피드 목록 삭제 성공 >> " + feeds.getFeedList());
    }

    //피드 상세보기
    @Override
    @Transactional
    public FeedResDto feedDetail(int feedNo, String userNo) throws Exception{

        Optional<Feed> obj = feedRepository.findById(feedNo);
        if(obj.isEmpty())
            throw new NullPointerException("해당 피드가 존재하지 않습니다");

        Feed feed = obj.get();
        String feedUserNo = feed.getUserNo();
        String feedUserId = userDetailRepository.findByUserNo(feedUserNo).getUserId(); //피드 작성자의 userId

        List<FileDto> files = new ArrayList<>();
        for(File file : feed.getFiles() )
            files.add(new FileDto(file.getFileNo(), file.getFilePath()));

        FeedResDto feedDto = FeedResDto.builder()
                .feedNo(feed.getFeedNo())
                .content(feed.getContent())
                .regTime(feed.getRegTime())
                .cafeId(feed.getCafeId())
                .categoryList(feed.getCategoryList())
                .likeCount(feed.getLikeCount())
                .userId(feedUserId)
                .files(files)
                .liked(feedLikeState(feedNo, userNo)) //좋아요 상태 확인
                .build();

        return feedDto;
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

    //피드 리스트(feeds 테이블)
    @Override
    @Transactional
    public List<FeedResDto> feedListByTable(String feedUserNo, String userNo) throws Exception {

        Optional<Feeds> feeds = feedsRepository.findById(feedUserNo);
        if(feeds.isEmpty()) //feedUser가 작성한 피드 없음
            return new ArrayList<>(); //빈 리스트 return

        List<Integer> feedList  = feeds.get().getFeedList(); //feedUser의 피드 목록
//        System.out.println("피드 목록 : " + feedList);

        List<FeedResDto> feedDtoList = new ArrayList<>();
        for(int feedNo : feedList)
            feedDtoList.add(feedDetail(feedNo, userNo));

        return feedDtoList;
    }

    //피드 리스트(userNo)
    @Override
    @Transactional
    public List<FeedResDto> feedList(String feedUserNo, String userNo) throws Exception{

        Optional<List<Feed>> feedList = feedRepository.findByUserNoOrderByRegTime(feedUserNo);
        if(feedList.isEmpty()) //feedUser가 작성한 피드 없음
            return new ArrayList<>(); //빈 리스트 return

        List<FeedResDto> feedDtoList = new ArrayList<>();
        for(Feed feed : feedList.get())
            feedDtoList.add(feedDetail(feed.getFeedNo(), userNo));

        return feedDtoList;
    }

    //게시글 좋아요 컨트롤
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

    //게시글 수정
    @Override
    public void feedModify(String userNo, FeedModifyDto feedDto, MultipartFile[] files) throws Exception{

//        int feedNo =

        //feedModifyDto에 삭제한 사진(파일) 번호 포함해서 받기
        //기존 파일 삭제
        //새로운 파일 등록

        //카테고리 목록 수정 -> 카테고리 로그, 캐시 삭제?
    }
}