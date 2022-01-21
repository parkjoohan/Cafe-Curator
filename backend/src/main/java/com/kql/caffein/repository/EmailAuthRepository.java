package com.kql.caffein.repository;

import com.kql.caffein.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, String> {
    EmailAuth findByUserNo(String userNo);
}
