package com.kql.caffein.repository;

import com.kql.caffein.entity.Comment.CommentLike;
import com.kql.caffein.entity.Feed.FeedLike;
import com.kql.caffein.entity.Feed.FeedLikeId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, FeedLikeId> {

    @Query("select l.feedLikeId.feedNo from FeedLike l where l.feedLikeId.userNo = ?1")
    Optional<List<Integer>> getLikeList(String userNo);

    @Query("select c from FeedLike c " +
            "where c.feedLikeId.feedNo = :feedNo and c.feedLikeId.userNo < :lastUserNo order by c.feedLikeId.userNo desc ")
    Page<FeedLike> findByFeedNoAndUserNoLessThanOrderByUserNoDesc(int feedNo, String lastUserNo, Pageable pageRequest);
}
