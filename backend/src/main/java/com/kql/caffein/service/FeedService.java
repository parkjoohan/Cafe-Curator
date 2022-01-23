package com.kql.caffein.service;

import com.kql.caffein.dto.FeedModifyDto;
import com.kql.caffein.dto.FeedRegisterDto;
import com.kql.caffein.dto.FeedResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FeedService {

    public void feedRegister(FeedRegisterDto feedDto, MultipartFile[] files) throws Exception;
    public void addFeedList(int feedNo, String userNo) throws Exception;
    public void feedDelete(int feedNo, String userNo) throws Exception;
    public void removeFeedList(int feedNo, String userNo) throws Exception;
    public FeedResDto feedDetail(int feedNo, String userNo) throws Exception;
    public boolean feedLikeState(int feedNo, String userNo);
    public List<FeedResDto> feedListByTable(String feedUserNo, String userNo) throws Exception;
    public List<FeedResDto> feedList(String feedUserNo, String userNo) throws Exception;
    public String feedLikeControl(int feedNo, String userNo) throws Exception;
    public void feedModify(String userNo, FeedModifyDto feedDto, MultipartFile[] files) throws Exception;

    public String feedBookmarkControl(int feedNo, String userNo) throws Exception;
    public boolean BookmarkState(int feedNo, String userNo);
    public List<FeedResDto> bookmarkList(String userNo) throws Exception;
}