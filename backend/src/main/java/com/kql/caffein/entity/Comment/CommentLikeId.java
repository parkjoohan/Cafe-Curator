package com.kql.caffein.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CommentLikeId implements Serializable {

    private String userNo;
    private int commentNo;
}
