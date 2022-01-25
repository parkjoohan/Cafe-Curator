package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.entity.Follow.Follow;
import com.kql.caffein.entity.Follow.FollowId;
import com.kql.caffein.entity.UserDetail;
import com.kql.caffein.repository.FollowRepository;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.service.FollowService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserDetailRepository userDetailRepository;

    @Autowired
    public FollowServiceImpl(FollowRepository followRepository, UserDetailRepository userDetailRepository) {
        this.followRepository = followRepository;
        this.userDetailRepository = userDetailRepository;
    }

    @Override
    public boolean checkFollow(String userNo, String followNo) {
        return followRepository.findById(new FollowId(userNo,followNo)).isPresent();
    }

    @Override
    public void follow(String userNo, String followNo) {
        if(checkFollow(userNo, followNo))
            followRepository.deleteById(new FollowId(userNo,followNo));
        else
            followRepository.save(new Follow(userNo,followNo));

    }

    @Override
    public List<FollowDto> followerList(String userNo, String lastUserNo, int size) {
        if(lastUserNo == null) lastUserNo = "z";
        PageRequest pageRequest = PageRequest.of(0,size);
        Page<Follow> follower = followRepository.findByGetUserNoAndUserNoLessThanOrderByUserNoDesc(userNo, lastUserNo, pageRequest);

        List<FollowDto> list = new ArrayList<>();
        for(Follow follow : follower) {
            String followNo = follow.getUserNo();
            UserDetail user = userDetailRepository.findById(followNo).get();
            list.add(new FollowDto(followNo, user.getUserId(), user.getPicture(), checkFollow(userNo,followNo)));
        }
        return list;
    }

    @Override
    public List<FollowDto> followingList(String userNo, String lastUserNo, int size) {
        if(lastUserNo == null) lastUserNo = "z";
        PageRequest pageRequest = PageRequest.of(0,size);
        Page<Follow> following = followRepository.findByUserNoAndGetUserNoLessThanOrderByGetUserNoDesc(userNo,lastUserNo, pageRequest);

        List<FollowDto> list = new ArrayList<>();
        for(Follow follow : following) {
            String followNo = follow.getGetUserNo();
            UserDetail user = userDetailRepository.findById(followNo).get();
            list.add(new FollowDto(followNo, user.getUserId(), user.getPicture(), true));
        }
        return list;
    }
}
