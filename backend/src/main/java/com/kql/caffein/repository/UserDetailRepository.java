package com.kql.caffein.repository;

import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<UserDetail, String> {
    UserDetail findByUserNo(String userNo);
    Optional<UserDetail> findByUserId(String userId);
}

