package com.kql.caffein.repository;

import com.kql.caffein.entity.Comment.CommentLike;
import com.kql.caffein.entity.Comment.CommentLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, CommentLikeId> {

}
