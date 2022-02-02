package com.kql.caffein.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="category_log")
public class CategoryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int logId;

    int cafeId;
    String category;
    int feedNo;

    @Builder
    public CategoryLog(int cafeId, String category, int feedNo){
        this.cafeId = cafeId;
        this.category = category;
        this.feedNo = feedNo;
    }
}