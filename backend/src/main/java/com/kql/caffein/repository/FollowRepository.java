package com.kql.caffein.repository;

import com.kql.caffein.entity.Follow.Follow;
import com.kql.caffein.entity.Follow.FollowId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    Page<Follow> findByGetUserNoAndUserNoLessThanOrderByUserNoDesc(String userNo, String lastUserNo, Pageable pageRequest);

    Page<Follow> findByUserNoAndGetUserNoLessThanOrderByGetUserNoDesc(String userNo, String lastUserNo, Pageable pageRequest);

    @Query("select f.getUserNo from Follow f where f.userNo = ?1")
    Optional<List<String>> getFollowingList(String userNo);
}
