package com.kql.caffein.repository;

import com.kql.caffein.entity.CategoryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface CategoryLogRepository extends JpaRepository<CategoryLog, Integer> {

    @Modifying
    @Query("delete from CategoryLog c where c.feedNo = ?1")
    void deleteByFeedNo(int feedNo);

    Optional<List<CategoryLog>> findByCafeId(int cafeId);
}