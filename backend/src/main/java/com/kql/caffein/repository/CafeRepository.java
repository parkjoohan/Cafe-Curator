package com.kql.caffein.repository;

import com.kql.caffein.entity.Cafe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CafeRepository extends JpaRepository<Cafe, Integer> {

    Optional<Cafe> findByCafeLngAndCafeLat(String cafeLng, String cafeLat);
    Optional<Cafe> findByCafeName (String cafeName);
}