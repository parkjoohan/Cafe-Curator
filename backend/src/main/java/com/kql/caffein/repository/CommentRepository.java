package com.kql.caffein.repository;

import com.kql.caffein.entity.Comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    //feed의 댓글 개수 (대댓글 제외)
    @Query("select count(c.commentGroup) from Comment c where c.feedNo = :feedNo")
    int countByFeedNo(int feedNo);

    //한 feed의 댓글의 대댓글 단계 중 가장 큰 수
    @Query("select max(c.sequence) from Comment c where c.feedNo = :feedNo and c.commentGroup = :commentGroup")
    int maxByFeedNoAndAndCommentGroup(int feedNo, int commentGroup);

    @Query("select c from Comment c where c.feedNo = :feedNo order by c.commentGroup, c.sequence")
    List<Comment> findByFeedNoOrderByCommentGroupAndSequence(int feedNo);
}
