package com.kql.caffein.repository;

import com.kql.caffein.entity.Bookmark;
import com.kql.caffein.entity.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkId> {

    @Query("select b.bookmarkId.feedNo from Bookmark b where b.bookmarkId.userNo = ?1")
    Optional<List<Integer>> getBookmarkList(String userNo);
}
