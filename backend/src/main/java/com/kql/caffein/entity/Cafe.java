package com.kql.caffein.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="cafe")
public class Cafe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cafeId;

    String name;

    @Builder
    public Cafe(String name){
        this.name = name;
    }
}