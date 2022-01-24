package com.kql.caffein.service;

import com.kql.caffein.dto.Comment.CommentReqDto;
import com.kql.caffein.dto.Comment.CommentResDto;
import com.kql.caffein.entity.Comment.Comment;
import com.kql.caffein.entity.Comment.CommentLikeId;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CommentService {
    //댓글 등록
    void insertComment(CommentReqDto commentDto);
    
    //페이징 목록 조회
    List<CommentResDto> listComment(String userNo, Page<Comment> comments);

    //댓글 목록 페이징
    List<CommentResDto> pageComment(String userNo, int feedNo, Integer lastCommentNo, int size);
    //대댓글 목록 페이징
    List<CommentResDto> pageNestedComment(String userNo, int parentNo, Integer lastCommentNo, int size);

    //댓글 삭제
    void deleteComment(String userNo, int commentNo);

    //댓글 좋아요
    void likeComment(String userNo, int commentNo);

    //댓글 좋아요 유무 확인
    boolean findCommentLikeByUserNo(CommentLikeId commentLikeId);
}
