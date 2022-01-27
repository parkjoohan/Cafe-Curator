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

  @Query(value = "select * from feed where :category member of (category_list) order by like_count desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByLikeCountDesc(String category, Pageable pageRequest);

  @Query(value = "select * from Feed where :category member of (category_list) order by reg_time desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByRegTime(String category, Pageable pageRequest);
}