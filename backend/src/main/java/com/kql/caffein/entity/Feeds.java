package com.kql.caffein.entity;

import com.kql.caffein.converter.FeedListConverter;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="feeds")
public class Feeds {

    @Id
    private String userNo;

    @Convert(converter = FeedListConverter.class)
    @Column(columnDefinition = "json")
    private List<Integer> feedList;

    @Builder
    public Feeds(String userNo, List<Integer> feedList){
        this.userNo = userNo;
        this.feedList = feedList;
    }
}