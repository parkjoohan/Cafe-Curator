package com.kql.caffein.repository;

import com.kql.caffein.entity.FeedLike;
import com.kql.caffein.entity.FeedLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedLikeRepository extends JpaRepository<FeedLike, FeedLikeId> {
}
