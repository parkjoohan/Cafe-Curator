package com.kql.caffein.service;
import java.util.List;

public interface SearchService {
    List categorySearchWithPaging(String userNo, String category, String order, int size);
}
