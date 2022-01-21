package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

  Optional<List<Feed>> findByUserNoOrderByRegTime(String userNo);
}
