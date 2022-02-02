package com.kql.caffein.entity.Feed;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kql.caffein.entity.Feed.Feed;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString(exclude = "feed")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="file")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fileNo;

    private String filePath;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "feed_no")
    private Feed feed;

    @Builder
    public File(String filePath, Feed feed){
        this.filePath = filePath;
        this.feed = feed;
    }
}