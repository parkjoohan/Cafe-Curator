package com.kql.caffein.service;
import java.util.List;

public interface SearchService {
    //카테고리 검색 - 인기순
    List categorySearchTopWithPaging(String userNo, String category, Integer lastLikeCount, Integer lastFeedNo, int size);
    
    //카테고리 검색 - 최신순
    List categorySearchRecentWithPaging(String userNo, String category, Integer lastFeedNo, int size);
}
