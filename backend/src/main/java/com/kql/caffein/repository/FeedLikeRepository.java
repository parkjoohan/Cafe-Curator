package com.kql.caffein.repository;

import com.kql.caffein.entity.FeedLike;
import com.kql.caffein.entity.FeedLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, FeedLikeId> {

    @Query("select l.feedLikeId.feedNo from FeedLike l where l.feedLikeId.userNo = ?1")
    Optional<List<Integer>> getLikeList(String userNo);
}
