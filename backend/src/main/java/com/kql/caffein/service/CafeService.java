package com.kql.caffein.service;

import com.kql.caffein.entity.Cafe;

import java.util.Map;
import java.util.Optional;

public interface CafeService {

    //카페 위경도 변환
    Map<String,String> lenAndLatConversion(double cafeX, double cafeY);

    //카페 조회
    Optional<Cafe> getCafe(Map<String,String> cafeLngAndLat);

    //카페 저장
    int addCafe(Map<String,String> cafeLngAndLat, String cafeName, String cafeAddress);
}
