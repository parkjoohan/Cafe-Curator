package com.kql.caffein.service.Impl;

import com.kql.caffein.entity.Feed.Feed;
import com.kql.caffein.repository.FeedRepository;
import com.kql.caffein.service.FeedService;
import com.kql.caffein.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    private final FeedRepository feedRepository;
    private final FeedService feedService;

    @Autowired
    public SearchServiceImpl(FeedRepository feedRepository, FeedService feedService) {
        this.feedRepository = feedRepository;
        this.feedService = feedService;
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
}