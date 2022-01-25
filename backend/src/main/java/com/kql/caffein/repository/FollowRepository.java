package com.kql.caffein.repository;

import com.kql.caffein.entity.Follow;
import com.kql.caffein.entity.FollowId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    Page<Follow> findByGetUserNoAndUserNoLessThanOrderByUserNoDesc(String userNo, String lastUserNo, Pageable pageRequest);

    Page<Follow> findByUserNoAndGetUserNoLessThanOrderByGetUserNoDesc(String userNo, String lastUserNo, Pageable pageRequest);
}
