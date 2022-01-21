package com.kql.caffein.repository;

import com.kql.caffein.entity.Feeds;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedsRepository extends JpaRepository<Feeds, String> {
}
