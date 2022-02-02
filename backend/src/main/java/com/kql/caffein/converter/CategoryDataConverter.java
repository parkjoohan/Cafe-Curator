package com.kql.caffein.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.List;

public class CategoryDataConverter implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        //categoryList -> json 문자열
        try{
//            System.out.println("CategoryDataConverter convertToDatabaseColumn >> " + attribute);
            if(attribute == null){ //categoryList에 null이 문자열로 들어가지 않도록 처리
                return null;
            }
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        //json 문자열 -> categoryList
        try{
//            System.out.println("CategoryDataConverter convertToEntityAttribute >> " + dbData);
            if(dbData == null){
                return null;
            }
            return objectMapper.readValue(dbData, List.class);
        } catch (IOException e){
            throw new IllegalArgumentException();
        }
    }
}