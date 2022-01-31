package com.kql.caffein.repository;

import com.kql.caffein.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from user u " + "where u.email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email);

    User findByUserNo(String userNo);

    @Transactional
    void deleteByUserNo(String userNo);
}
