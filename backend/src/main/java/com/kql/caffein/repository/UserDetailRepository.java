package com.kql.caffein.repository;

import com.kql.caffein.entity.User.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<UserDetail, String> {
    UserDetail findByUserNo(String userNo);
    Optional<UserDetail> findByUserId(String userId);

    List<UserDetail> findByUserIdContaining(String userId);
}

