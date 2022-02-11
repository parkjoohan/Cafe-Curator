package com.kql.caffein.service;

import com.kql.caffein.dto.Feed.*;
import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.entity.Feed.Feed;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FeedService {

    //피드 등록
    public void feedRegister(FeedRegisterDto feedDto, MultipartFile[] files) throws Exception;
    //유저의 피드 목록에 피드 추가
    public void addFeedList(int feedNo, String userNo) throws Exception;

    //피드 삭제
    public void feedDelete(int feedNo, String userNo) throws Exception;
    //유저의 피드 목록에서 피드 삭제
    public void removeFeedList(int feedNo, String userNo) throws Exception;

    //피드 상세보기
    public FeedDetailDto feedDetail(int feedNo, String userNo) throws Exception;

    //피드 수정
    public void feedModify(String userNo, FeedModifyDto feedDto, MultipartFile[] files) throws Exception;

    //피드 좋아요 상태
    public boolean feedLikeState(int feedNo, String userNo);
    //피드 좋아요 컨트롤
    public String feedLikeControl(int feedNo, String userNo) throws Exception;

    //피드 북마크 상태
    public boolean BookmarkState(int feedNo, String userNo);
    //피드 북마크 컨트롤
    public String feedBookmarkControl(int feedNo, String userNo) throws Exception;

    //개인 피드 목록
    public List feedListWithPaging(String feedUserNo, String userNo, String type, Integer lastFeedNo, int size) throws Exception;
    //북마크한 피드 목록
    public List bookmarkListWithPaging(String userNo, String type, Integer lastFeedNo, int size) throws Exception;
    //좋아요 누른 피드 목록
    public List likeListWithPaging(String userNo, String type, Integer lastFeedNo, int size) throws Exception;
    //메인 피드 목록
    public List mainFeedListWithPaging(String userNo, String type, Integer lastFeedNo, int size) throws Exception;

    //피드 좋아요 누른 회원 목록
    public List<FollowDto> feedLikeUserList(String userNo, int feedNo, String lastUserNo, int size);

    //목록 조회 응답 DtoList (블로그 형식)
    public List<BlogResDto> makeBlogDtoList(List<Feed> list, String userNo);
    //목록 조회 응답 DtoList (피드 형식)
    public List<FeedResDto> makeFeedDtoList(List<Feed> list, String userNo);

    //카페 좌표 변환 후 DB 저장
    public int addCafe(double cafeX, double cafeY, String cafeName, String cafeAddress);

    //회원 탈퇴 시 피드 관련 데이터들 삭제
    public void deleteUser(String userNo);
}