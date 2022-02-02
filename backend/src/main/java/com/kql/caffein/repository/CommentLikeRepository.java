package com.kql.caffein.repository;

import com.kql.caffein.entity.Comment.CommentLike;
import com.kql.caffein.entity.Comment.CommentLikeId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, CommentLikeId> {

    @Query("select c from CommentLike c " +
            "where c.commentLikeId.commentNo = :commentNo and c.commentLikeId.userNo < :lastUserNo order by c.commentLikeId.userNo desc ")
    Page<CommentLike> findByCommentNoAndUserNoLessThanOrderByUserNoDesc(int commentNo, String lastUserNo, Pageable pageRequest);
}
