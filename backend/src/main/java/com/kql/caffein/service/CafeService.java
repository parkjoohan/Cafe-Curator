package com.kql.caffein.service;

import com.kql.caffein.entity.Cafe;

import java.util.Optional;

public interface CafeService {

    //카페 조회
    Optional<Cafe> getCafe(String cafeLng, String cafeLat);

    //카페 저장
    int addCafe(String cafeLng, String cafeLat, String cafeName, String cafeAddress);

    //카페 위, 경도 조회
    Optional<Cafe> getCafeLngAndLat(String cafeName);

}
