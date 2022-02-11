package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

  Page<Feed> findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(int lastFeedNo, List<Integer> feedList, Pageable pageRequest); //feedList에 있는 게시물

  Page<Feed> findByFeedNoLessThanOrderByFeedNoDesc(int lastFeedNo, Pageable pageable); //전체 게시물

  Page<Feed> findByUserNoInAndFeedNoLessThanOrderByFeedNoDesc(List<String> followingList, int lastFeedNo, Pageable pageable); //팔로잉 게시물

  @Query(value = "select * from feed " +
          "where like_count <= :lastLikeCount and feed_no < :lastFeedNo and :category member of (category_list) " +
          "order by like_count desc, feed_no desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByLikeCountDesc(Integer lastLikeCount, Integer lastFeedNo, String category, Pageable pageRequest);

  @Query(value = "select * from Feed where feed_no < :lastFeedNo and :category member of (category_list) order by feed_no desc", nativeQuery = true)
  Page<Feed> findByCategoryListOrderByRegTime(Integer lastFeedNo, String category, Pageable pageRequest);

  //랜덤 게시물
  @Query(value = "select f.* from feed f join(select feed_no from feed where feed_no < :lastFeedNo order by rand() limit :size) as r on f.feed_no = r.feed_no order by feed_no desc;", nativeQuery = true)
  List<Feed> getRandomFeedList(int lastFeedNo, int size);

  //본인 게시글 + 팔로잉 게시물 + 카테고리 포함하는 게시물
  @Query(value = "select * from feed where (json_overlaps(category_list, :categoryList) or user_no in :followingList) and feed_no < :lastFeedNo order by feed_no desc ", nativeQuery = true)
  Page<Feed> getMainFeedList(String categoryList, List<String> followingList, int lastFeedNo, Pageable pageRequest);

  //해당 카페를 등록한 피드 목록
  Page<Feed> findByCafeIdAndFeedNoLessThanOrderByFeedNoDesc(int cafeId, Integer lastFeedNo, Pageable pageRequest);

  //해당 카페를 등록한 피드 목록
  Page<Feed> findByCafeIdInAndFeedNoLessThanOrderByFeedNoDesc(List<Integer> cafeId, Integer lastFeedNo, Pageable pageRequest);
}