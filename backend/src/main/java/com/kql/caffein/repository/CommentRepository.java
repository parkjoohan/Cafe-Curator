package com.kql.caffein.repository;

import com.kql.caffein.entity.Comment.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Optional<List<Comment>> findByFeedNoAndSequence(int feedNo, int sequence);

    //한 feed의 댓글의 대댓글 단계 중 가장 큰 수
    @Query("select max(c.sequence) from Comment c where c.feedNo = :feedNo and c.commentGroup = :commentGroup")
    int maxByFeedNoAndCommentGroup(@Param("feedNo") int feedNo, @Param("commentGroup") int commentGroup);

    Page<Comment> findByFeedNoAndSequenceAndCommentNoLessThanOrderByCommentNoDesc(int feedNo, int sequence, int lastCommentNo, Pageable pageRequest);

    Page<Comment> findByFeedNoAndCommentGroupAndSequenceGreaterThanEqualAndCommentNoGreaterThanOrderByCommentNo(int feedNo, int group, int i, Integer lastCommentNo, Pageable pageRequest);
}
