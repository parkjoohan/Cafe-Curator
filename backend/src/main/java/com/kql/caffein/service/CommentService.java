package com.kql.caffein.service;

import com.kql.caffein.dto.Comment.CommentReqDto;
import com.kql.caffein.dto.Comment.CommentResDto;
import com.kql.caffein.entity.Comment.CommentLikeId;

import java.util.List;

public interface CommentService {
    //댓글 등록
    void insertComment(CommentReqDto commentDto);
    
    //댓글 목록 조회
    List<CommentResDto> listComment(String userNo, int feedNo);
    
    //댓글 삭제
    void deleteComment(String userNo, int commentNo);

    //댓글 좋아요
    void likeComment(String userNo, int commentNo);

    //댓글 좋아요 유무 확인
    boolean findCommentLikeByUserNo(CommentLikeId commentLikeId);
}
