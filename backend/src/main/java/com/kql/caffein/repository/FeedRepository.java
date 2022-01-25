package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

  Page<Feed> findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(int lastFeedNo, List<Integer> feedList, Pageable pageRequest);
}