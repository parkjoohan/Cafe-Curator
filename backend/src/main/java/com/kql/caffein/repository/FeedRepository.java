package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed, Integer> {

  Page<Feed> findByFeedNoLessThanAndFeedNoInOrderByFeedNoDesc(int lastFeedNo, List<Integer> feedList, Pageable pageRequest);

  Optional<List<Feed>> findByUserNoOrderByRegTime(String userNo);
}