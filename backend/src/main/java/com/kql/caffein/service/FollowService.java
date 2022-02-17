package com.kql.caffein.service;

import com.kql.caffein.dto.FollowDto;

import java.util.List;

public interface FollowService {
    boolean checkFollow(String userNo, String followNo);
    void follow(String userNo, String followNo);
    List<FollowDto> followerList (String loginUserNo, String userNo, String lastUserNo, int size);
    List<FollowDto> followingList (String loginUserNo, String userNo, String lastUserNo, int size);
}
