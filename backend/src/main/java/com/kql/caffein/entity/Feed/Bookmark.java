package com.kql.caffein.entity.Feed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="bookmark")
public class Bookmark {

    @EmbeddedId
    private BookmarkId bookmarkId;
}