package com.kql.caffein.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CommentLike {

    @EmbeddedId
    private CommentLikeId commentLikeId;
}
