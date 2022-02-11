package com.kql.caffein.service;
import com.kql.caffein.dto.Feed.FeedResDto;
import com.kql.caffein.dto.Search.CafeSearchReqDto;
import com.kql.caffein.dto.Search.CafeSearchResDto;

import java.util.List;

public interface SearchService {
    //카테고리 검색 - 인기순
    List categorySearchTopWithPaging(String userNo, String category, Integer lastLikeCount, Integer lastFeedNo, int size);
    
    //카테고리 검색 - 최신순
    List categorySearchRecentWithPaging(String userNo, String category, Integer lastFeedNo, int size);
    
    //카페 검색
    CafeSearchResDto cafeSearchWithPaging(String userNo, int cafeId, Integer lastFeedNo, int size);

    //카페 목록 검색
    List<FeedResDto> cafeListSearchWithPaging(CafeSearchReqDto cafeSearchReqDto);
}
