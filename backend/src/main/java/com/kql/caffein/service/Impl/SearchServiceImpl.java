package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.Search.CafeSearchReqDto;
import com.kql.caffein.dto.Search.CafeSearchResDto;
import com.kql.caffein.dto.Feed.FeedResDto;
import com.kql.caffein.dto.Search.UserSearchDto;
import com.kql.caffein.entity.Cafe;
import com.kql.caffein.entity.Feed.Feed;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.CafeRepository;
import com.kql.caffein.repository.FeedRepository;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SearchServiceImpl implements SearchService {

    private final FeedRepository feedRepository;
    private final FeedService feedService;
    private final CafeRepository cafeRepository;
    private final RedisTemplate redisTemplate;
    private final CategoryLogService categoryLogService;
    private final CafeService cafeService;
    private final UserDetailRepository userDetailRepository;

    @Autowired
    public SearchServiceImpl(FeedRepository feedRepository, FeedService feedService, CafeRepository cafeRepository, RedisTemplate redisTemplate, CategoryLogService categoryLogService, CafeService cafeService, UserDetailRepository userDetailRepository) {
        this.feedRepository = feedRepository;
        this.feedService = feedService;
        this.cafeRepository = cafeRepository;
        this.redisTemplate = redisTemplate;
        this.categoryLogService = categoryLogService;
        this.cafeService = cafeService;
        this.userDetailRepository = userDetailRepository;
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
        Page<Feed> feedList = feedRepository.findByCategoryListOrderByFeedNoDesc(lastFeedNo, category, pageRequest);

        return feedService.makeFeedDtoList(feedList.getContent(), userNo);
    }

    @Override
    @Transactional
    public CafeSearchResDto cafeSearchWithPaging(String userNo, int cafeId, Integer lastFeedNo, int size) {
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

        CafeSearchResDto cafeSearchDto = CafeSearchResDto.builder()
                .categoryList(category)
                .feedList(feedResDtoList).build();
        return cafeSearchDto;
    }

    @Override
    @Transactional
    public List<FeedResDto> cafeListSearchWithPaging(CafeSearchReqDto cafeSearchReqDto) {

        Double[][] cafeReq = cafeSearchReqDto.getCafeLngAndLat();

        //카페 아이디 찾기
        List<Integer> cafeIds = new ArrayList<>();
        for(Double[] c : cafeReq) {
            Optional<Cafe> cafe = cafeService.getCafe(String.valueOf(c[0]),String.valueOf(c[1]));
            if(cafe.isPresent()) { //카페가 존재하면
                cafeIds.add(cafe.get().getCafeId());
            }
        }

        Integer lastFeedNo = cafeSearchReqDto.getFeedNo();
        if (lastFeedNo == null) lastFeedNo = Integer.MAX_VALUE;

        PageRequest pageRequest = PageRequest.of(0, cafeSearchReqDto.getSize());
        Page<Feed> feedList = feedRepository.findByCafeIdInAndFeedNoLessThanOrderByFeedNoDesc(cafeIds, lastFeedNo, pageRequest);

        List<FeedResDto> feedResDtoList = feedService.makeFeedDtoList(feedList.getContent(), cafeSearchReqDto.getUserNo());

        return feedResDtoList;
    }

    @Override
    @Transactional
    public List<UserSearchDto> userSearch(String userId) {
        List<UserDetail> list = userDetailRepository.findByUserIdContaining(userId);

        List<UserSearchDto> userList = new ArrayList<>();
        for(UserDetail u : list) {
            UserSearchDto user = UserSearchDto.builder()
                    .userId(u.getUserId())
                    .picture(u.getPicture())
                    .followerCount(u.getFollowerCount())
                    .followingCount(u.getFollowingCount()).build();
            userList.add(user);
        }
        return userList;
    }
}