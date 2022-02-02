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

    String cafeName;

    String cafeAddress;

    String cafeLat;

    String cafeLng;

    @Builder
    public Cafe(String cafeName, String cafeAddress, String cafeLat, String cafeLng){
        this.cafeName = cafeName;
        this.cafeAddress = cafeAddress;
        this.cafeLat = cafeLat;
        this.cafeLng = cafeLng;
    }
}