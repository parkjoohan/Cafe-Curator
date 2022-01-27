package com.kql.caffein.service.Impl;

import com.kql.caffein.entity.Feed.Feed;
import com.kql.caffein.repository.FeedRepository;
import com.kql.caffein.service.FeedService;
import com.kql.caffein.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public List categorySearchWithPaging(String userNo, String category, String order, int size) {
        PageRequest pageRequest = PageRequest.of(0,size);
        Page<Feed> feedList;

        if(order.equals("top")) //인기순
            feedList = feedRepository.findByCategoryListOrderByLikeCountDesc(category, pageRequest);
        else //최신순
            feedList = feedRepository.findByCategoryListOrderByRegTime(category, pageRequest);

        return feedService.makeFeedDtoList(feedList, userNo);
    }
}
