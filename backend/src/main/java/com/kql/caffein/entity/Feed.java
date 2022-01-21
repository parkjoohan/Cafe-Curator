package com.kql.caffein.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kql.caffein.converter.CategoryDataConverter;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(exclude = "feed")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name="feed")
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedNo;

    @Column(columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    private LocalDateTime regTime;

    private Integer cafeId;

    @Convert(converter = CategoryDataConverter.class)
    @Column(columnDefinition = "json")
    private List<String> categoryList;

    private int likeCount;

    private String userNo;

    @JsonManagedReference
    @OneToMany(mappedBy = "feed") //양방향 매핑을 위해 연관 관계의 주인을 mappedBy로 지정
    private List<File> files = new ArrayList<>();

    @Builder
    public Feed(String content, LocalDateTime regTime, Integer cafeId, List<String> categoryList, int likeCount, String userNo){
        this.content = content;
        this.regTime = regTime;
        this.cafeId = cafeId;
        this.categoryList = categoryList;
        this.likeCount = likeCount;
        this.userNo = userNo;
    }
}