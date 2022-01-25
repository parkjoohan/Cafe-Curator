package com.kql.caffein.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileDto {
    private int fileNo;
    private String filePath;
}