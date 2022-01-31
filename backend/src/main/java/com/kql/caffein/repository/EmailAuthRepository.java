package com.kql.caffein.repository;

import com.kql.caffein.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, String> {
    Optional<EmailAuth> findByEmail(String email);

    @Modifying
    @Query(value = "delete from email_auth where email = :email", nativeQuery = true)
    void deleteByEmail(String email);
}
