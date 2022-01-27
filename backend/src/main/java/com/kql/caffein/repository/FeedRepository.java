package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

  Page<Feed> findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(int lastFeedNo, List<Integer> feedList, Pageable pageRequest);

  Page<Feed> findByFeedNoLessThanOrderByFeedNoDesc(int lastFeedNo, Pageable pageable);

  Page<Feed> findByUserNoInAndFeedNoLessThanOrderByFeedNoDesc(List<String> followingList, int lastFeedNo, Pageable pageable);

  @Query(value = "select * from feed " +
          "where like_count <= :lastLikeCount and feed_no < :lastFeedNo and :category member of (category_list) " +
          "order by like_count desc, feed_no desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByLikeCountDesc(Integer lastLikeCount, Integer lastFeedNo, String category, Pageable pageRequest);

  @Query(value = "select * from Feed where feed_no < :lastFeedNo and :category member of (category_list) order by feed_no desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByRegTime(Integer lastFeedNo, String category, Pageable pageRequest);
}