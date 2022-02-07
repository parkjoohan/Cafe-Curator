package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.Comment.CommentReqDto;
import com.kql.caffein.dto.Comment.CommentResDto;
import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.entity.Comment.Comment;
import com.kql.caffein.entity.Comment.CommentLike;
import com.kql.caffein.entity.Comment.CommentLikeId;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.CommentLikeRepository;
import com.kql.caffein.repository.CommentRepository;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.service.CommentService;
import com.kql.caffein.service.FollowService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final UserDetailRepository userDetailRepository;
    private final FollowService followService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, CommentLikeRepository commentLikeRepository, UserDetailRepository userDetailRepository, FollowService followService) {
        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.userDetailRepository = userDetailRepository;
        this.followService = followService;
    }

    @Override
    public void insertComment(CommentReqDto commentDto) {

        int feedNo = commentDto.getFeedNo();
        Integer parentNo = null;
        int grp = 0;
        int sequence = 0;

        //부모 댓글이 존재하지 않는다면
        if(commentDto.getParentNo()==0) {
            Optional<List<Comment>> comments = commentRepository.findByFeedNoAndSequence(feedNo,0);
            //피드에 댓글이 존재하면
            if(comments.isPresent()) {
                //그룹 번호 중 큰 값 구한다.
                for(Comment comment : comments.get()) {
                    grp = Math.max(grp,comment.getCommentGroup());
                }
            }
            //다음 그룹에 저장해야 하기 때문에 +1
            grp++;
        }else {
            //부모 댓글이 존재한다면
            parentNo = commentDto.getParentNo();
            //부모 댓글과 같은 그룹
            Optional<Comment> parentComment = commentRepository.findById(parentNo);
            grp = parentComment.get().getCommentGroup();

            //그룹 내 가장 높은 단계
            sequence = commentRepository.maxByFeedNoAndCommentGroup(feedNo,grp)+1;

            //댓글 카운팅
            int commentCount = parentComment.get().getCommentCount()+1;
            parentComment.get().setCommentCount(commentCount);
            commentRepository.save(parentComment.get());
        }

        Comment comment = Comment.builder()
                .feedNo(commentDto.getFeedNo())
                .commentGroup(grp)
                .sequence(sequence)
                .parentNo(parentNo)
                .content(commentDto.getContent())
                .userNo(commentDto.getUserNo()).build();

        commentRepository.save(comment);
    }

    @Override
    public List<CommentResDto> listComment(String userNo, Page<Comment> comments) {
        List<CommentResDto> list = new ArrayList<>();

        String commentUserID = "";
        String parentID = "";

        for(Comment comment : comments) {
            boolean checkLike = findCommentLikeByUserNo(new CommentLikeId(userNo,comment.getCommentNo()));

            commentUserID = userDetailRepository.findById(comment.getUserNo()).get().getUserId(); //회원 번호로 회원 아이디 찾기

            if(comment.getParentNo()!=null) {
                String parentCommentUserNo = commentRepository.findById(comment.getParentNo()).get().getUserNo();
                parentID = userDetailRepository.findById(parentCommentUserNo).get().getUserId(); //회원 번호로 회원 아이디 찾기
            }

            CommentResDto commentDto = CommentResDto.builder()
                    .commentNo(comment.getCommentNo())
                    .userId(commentUserID)
                    .content(comment.getContent())
                    .regTime(comment.getRegTime())
                    .commentGroup(comment.getCommentGroup())
                    .parentId(parentID)
                    .likeCount(comment.getLikeCount())
                    .commentCount(comment.getCommentCount())
                    .checkLike(checkLike).build();
            list.add(commentDto);
        }
        return list;
    }

    @Override
    public List<CommentResDto> pageComment(String userNo, int feedNo, Integer lastCommentNo, int size) {
        if(lastCommentNo == null)lastCommentNo = Integer.MAX_VALUE;

        PageRequest pageRequest = PageRequest.of(0,size);
        Page<Comment> comments = commentRepository.findByFeedNoAndSequenceAndCommentNoLessThanOrderByCommentNoDesc(feedNo,0,lastCommentNo, pageRequest);

        return listComment(userNo, comments);
    }

    @Override
    public List<CommentResDto> pageNestedComment(String userNo, int parentNo, Integer lastCommentNo, int size) {
        Comment parent = commentRepository.findById(parentNo).get();
        int feedNo = parent.getFeedNo();
        int group = parent.getCommentGroup();

        if(lastCommentNo == null) lastCommentNo = 0;

        PageRequest pageRequest = PageRequest.of(0,size);
        //같은 피드, 같은 그룹내 부모댓글 제외하고
        Page<Comment> comments = commentRepository.findByFeedNoAndCommentGroupAndSequenceGreaterThanEqualAndCommentNoGreaterThanOrderByCommentNo(feedNo,group,1,lastCommentNo,pageRequest);

        return listComment(userNo, comments);
    }

    @Override
    public void deleteComment(String userNo, int commentNo) {
        //작성자인지 확인
        Optional<Comment> comment = commentRepository.findById(commentNo);
        if(userNo.equals(comment.get().getUserNo()))
            commentRepository.deleteById(commentNo);
    }

    @Override
    public void likeComment(String userNo, int commentNo) {
        CommentLikeId commentLikeId = new CommentLikeId(userNo,commentNo);
        boolean checkLike = findCommentLikeByUserNo(commentLikeId);

        Optional<Comment> comment = commentRepository.findById(commentNo);
        int likeCount = comment.get().getLikeCount();

        if(checkLike) { //좋아요 취소
            commentLikeRepository.deleteById(commentLikeId);
            likeCount--;
        }else {
            commentLikeRepository.save(new CommentLike(commentLikeId));
            likeCount++;
        }
        comment.get().setLikeCount(likeCount);
        commentRepository.save(comment.get());
    }

    @Override
    public boolean findCommentLikeByUserNo(CommentLikeId commentLikeId) {
        return commentLikeRepository.findById(commentLikeId).isPresent();
    }

    @Override
    public List<FollowDto> commentLikeUserList(String userNo, int commentNo, String lastUserNo, int size) {
        if(lastUserNo == null) lastUserNo = "z";
        PageRequest pageRequest = PageRequest.of(0,size);
        Page<CommentLike> userList = commentLikeRepository.findByCommentNoAndUserNoLessThanOrderByUserNoDesc(commentNo,lastUserNo,pageRequest);

        List<FollowDto> list = new ArrayList<>();
        for(CommentLike user : userList) {
            String no = user.getCommentLikeId().getUserNo();
            UserDetail userDetail = userDetailRepository.findById(no).get();

            if(no.equals(userNo)) continue;
            list.add(new FollowDto(no, userDetail.getUserId(), userDetail.getPicture(), followService.checkFollow(userNo,no)));
        }
        return list;
    }
}