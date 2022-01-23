package com.kql.caffein.repository;

import com.kql.caffein.entity.Bookmark;
import com.kql.caffein.entity.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkId> {
    Optional<List<Bookmark>> findByBookmarkId_UserNo(String userNo);
}
