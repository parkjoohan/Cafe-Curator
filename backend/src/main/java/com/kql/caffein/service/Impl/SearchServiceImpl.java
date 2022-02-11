package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.CafeSearchDto;
import com.kql.caffein.dto.Feed.FeedResDto;
import com.kql.caffein.entity.Cafe;
import com.kql.caffein.entity.Feed.Feed;
import com.kql.caffein.repository.CafeRepository;
import com.kql.caffein.repository.FeedRepository;
import com.kql.caffein.service.CategoryLogService;
import com.kql.caffein.service.FeedService;
import com.kql.caffein.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class SearchServiceImpl implements SearchService {

    private final FeedRepository feedRepository;
    private final FeedService feedService;
    private final CafeRepository cafeRepository;
    private final RedisTemplate redisTemplate;
    private final CategoryLogService categoryLogService;

    @Autowired
    public SearchServiceImpl(FeedRepository feedRepository, FeedService feedService, CafeRepository cafeRepository, RedisTemplate redisTemplate, CategoryLogService categoryLogService) {
        this.feedRepository = feedRepository;
        this.feedService = feedService;
        this.cafeRepository = cafeRepository;
        this.redisTemplate = redisTemplate;
        this.categoryLogService = categoryLogService;
    }

    @Override
    @Transactional
    public List categorySearchTopWithPaging(String userNo, String category, Integer lastLikeCount, Integer lastFeedNo, int size) {
        if (lastFeedNo == null) lastFeedNo = Integer.MAX_VALUE;
        if(lastLikeCount == null) lastLikeCount = Integer.MAX_VALUE;

        PageRequest pageRequest  = PageRequest.of(0, size);
        Page<Feed>  feedList = feedRepository.findByCategoryListOrderByLikeCountDesc(lastLikeCount, lastFeedNo, category, pageRequest);

        return feedService.makeFeedDtoList(feedList.getContent(), userNo);
    }

    @Override
    @Transactional
    public List categorySearchRecentWithPaging(String userNo, String category, Integer lastFeedNo, int size) {
        if (lastFeedNo == null) lastFeedNo = Integer.MAX_VALUE;

        PageRequest pageRequest  = PageRequest.of(0, size);
        Page<Feed> feedList = feedRepository.findByCategoryListOrderByRegTime(lastFeedNo, category, pageRequest);

        return feedService.makeFeedDtoList(feedList.getContent(), userNo);
    }

    @Override
    @Transactional
    public CafeSearchDto cafeSearchWithPaging(String userNo, Cafe cafe, Integer lastFeedNo, int size) {
        int cafeId = cafe.getCafeId();
        Set<String> category = redisTemplate.opsForZSet().reverseRange(String.valueOf(cafeId),0,1);
        if(category.size()==0) {
            //redis 에 존재 하지 않음
            if(categoryLogService.registerCafeCategory(cafeId)) //redis에 값 저장 성공시
                category = redisTemplate.opsForZSet().reverseRange(String.valueOf(cafeId),0,1); //재 조회
        }
        
        if(lastFeedNo == null) lastFeedNo = Integer.MAX_VALUE;
        PageRequest pageRequest  = PageRequest.of(0, size);
        Page<Feed> feedList = feedRepository.findByCafeIdAndFeedNoLessThanOrderByFeedNoDesc(cafeId, lastFeedNo, pageRequest);

        List<FeedResDto> feedResDtoList = feedService.makeFeedDtoList(feedList.getContent(), userNo);

        CafeSearchDto cafeSearchDto = CafeSearchDto.builder()
                .categoryList(category)
                .feedList(feedResDtoList).build();
        return cafeSearchDto;
    }
}