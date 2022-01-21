package com.kql.caffein.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.List;

public class FeedListConverter implements AttributeConverter<List<Integer>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

    @Override
    public String convertToDatabaseColumn(List<Integer> attribute) {
        //feedList -> json 문자열
        try{
//            System.out.println("FeedListConverter convertToDatabaseColumn >> " + attribute);
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public List<Integer> convertToEntityAttribute(String dbData) {
        //json 문자열 -> feedList
        try{
//            System.out.println("FeedListConverter convertToEntityAttribute >> " + dbData);
            return objectMapper.readValue(dbData, List.class);
        } catch (IOException e){
            throw new IllegalArgumentException();
        }
    }
}