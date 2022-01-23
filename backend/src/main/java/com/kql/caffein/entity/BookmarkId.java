package com.kql.caffein.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkId implements Serializable {

    @Column(name="feed_no")
    public int feedNo;

    @Column(name="user_no")
    public String userNo;
}

