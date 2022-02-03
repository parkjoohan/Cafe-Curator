package com.kql.caffein.service;

import com.kql.caffein.entity.CategoryLog;
import com.kql.caffein.repository.CategoryLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class CategoryLogService {

    private final CategoryLogRepository categoryLogRepository;
    private final RedisTemplate redisTemplate;

    @Autowired
    public CategoryLogService(CategoryLogRepository categoryLogRepository, RedisTemplate redisTemplate) {
        this.categoryLogRepository = categoryLogRepository;
        this.redisTemplate = redisTemplate;
    }

    public boolean registerCafeCategory (int cafeId) {
        Optional<List<CategoryLog>> cafeList = categoryLogRepository.findByCafeId(cafeId);
        if(cafeList.isPresent()) { //cafe log가 존재할 경우
            Map<String, Integer> categoryMap = new HashMap<>();

            for(CategoryLog categoryLog : cafeList.get()) {
                String category = categoryLog.getCategory();
                categoryMap.put(category,categoryMap.getOrDefault(category,0)+1);
            }

            for(String key : categoryMap.keySet()) {
                redisTemplate.opsForZSet().add(String.valueOf(cafeId),key,categoryMap.get(key));
            }

            return true;
        }
        return false;
    }

    public void increaseCategoryCount(int cafeId, List<String> categoryList){
        for(String category: categoryList)
            redisTemplate.opsForZSet().incrementScore(String.valueOf(cafeId), category, 1);
    }

    public void decreaseCategoryCount(int cafeId, List<String> categoryList){
        for(String category: categoryList)
            redisTemplate.opsForZSet().incrementScore(String.valueOf(cafeId), category, -1);
    }
}
