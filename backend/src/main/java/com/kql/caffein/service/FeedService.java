package com.kql.caffein.service;

import com.kql.caffein.dto.*;
import com.kql.caffein.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FeedService {

    public void feedRegister(FeedRegisterDto feedDto, MultipartFile[] files) throws Exception;
    public void addFeedList(int feedNo, String userNo) throws Exception;

    public void feedDelete(int feedNo, String userNo) throws Exception;
    public void removeFeedList(int feedNo, String userNo) throws Exception;

    public FeedDetailDto feedDetail(int feedNo, String userNo) throws Exception;

    public void feedModify(String userNo, FeedModifyDto feedDto, MultipartFile[] files) throws Exception;

    public boolean feedLikeState(int feedNo, String userNo);
    public String feedLikeControl(int feedNo, String userNo) throws Exception;

    public boolean BookmarkState(int feedNo, String userNo);
    public String feedBookmarkControl(int feedNo, String userNo) throws Exception;

    public List feedListWithPaging(String feedUserNo, String userNo, String type, int lastFeedNo, int size) throws Exception;
    public List bookmarkListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception;
    public List likeListWithPaging(String userNo, String type, int lastFeedNo, int size) throws Exception;

    public List<BlogResDto> makeBlogDtoList(Page<Feed> list, String userNo);
    public List<FeedResDto> makeFeedDtoList(Page<Feed> list, String userNo);
}