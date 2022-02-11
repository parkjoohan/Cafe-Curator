package com.kql.caffein.service.Impl;

import com.kql.caffein.entity.Cafe;
import com.kql.caffein.repository.CafeRepository;
import com.kql.caffein.service.CafeService;
import org.locationtech.proj4j.BasicCoordinateTransform;
import org.locationtech.proj4j.CRSFactory;
import org.locationtech.proj4j.CoordinateReferenceSystem;
import org.locationtech.proj4j.ProjCoordinate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CafeServiceImpl implements CafeService {

    private final CafeRepository cafeRepository;

    @Autowired
    public CafeServiceImpl(CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    @Override
    public Map<String,String> lenAndLatConversion(double cafeX, double cafeY) {
        CRSFactory factory = new CRSFactory();
        CoordinateReferenceSystem srcCrs = factory.createFromName("EPSG:5179");
        CoordinateReferenceSystem dstCrs = factory.createFromName("EPSG:4326");
        BasicCoordinateTransform transform = new BasicCoordinateTransform(srcCrs, dstCrs);
        ProjCoordinate srcCoord = new ProjCoordinate(cafeX, cafeY);
        ProjCoordinate dstCoord = new ProjCoordinate();
        transform.transform(srcCoord, dstCoord); //좌표계 변환
//        System.out.println("좌표 변환 >> " + dstCoord.x + " " + dstCoord.y);

        Map<String,String> cafeLngAndLat = new HashMap<>();
        cafeLngAndLat.put("cafeLng",String.valueOf(dstCoord.x));
        cafeLngAndLat.put("cafeLat",String.valueOf(dstCoord.y));
        return cafeLngAndLat;
    }

    @Override
    public Optional<Cafe> getCafe(Map<String,String> cafeLngAndLat) {
        return cafeRepository.findByCafeLngAndCafeLat(cafeLngAndLat.get("cafeLng"), cafeLngAndLat.get("cafeLat"));
    }

    @Override
    public int addCafe(Map<String,String> cafeLngAndLat, String cafeName, String cafeAddress) {
        Cafe cafeEntity = Cafe.builder()
                .cafeName(cafeName)
                .cafeAddress(cafeAddress)
                .cafeLng(cafeLngAndLat.get("cafeLng"))
                .cafeLat(cafeLngAndLat.get("cafeLat"))
                .build();
        cafeRepository.save(cafeEntity);
        return cafeEntity.getCafeId();
    }
}
