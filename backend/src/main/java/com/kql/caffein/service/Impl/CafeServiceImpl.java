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
    public Optional<Cafe> getCafe(String cafeLng, String cafeLat) {
        return cafeRepository.findByCafeLngAndCafeLat(cafeLng, cafeLat);
    }

    @Override
    public int addCafe(String cafeLng, String cafeLat, String cafeName, String cafeAddress) {
        Cafe cafeEntity = Cafe.builder()
                .cafeName(cafeName)
                .cafeAddress(cafeAddress)
                .cafeLng(cafeLng)
                .cafeLat(cafeLat)
                .build();
        cafeRepository.save(cafeEntity);
        return cafeEntity.getCafeId();
    }

    @Override
    public Optional<Cafe> getCafeLngAndLat(String cafeName) {
        return cafeRepository.getByCafeName(cafeName);
    }
}
