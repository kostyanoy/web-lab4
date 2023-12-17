package com.itmo.weblab4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PointsResponseDTO {
    boolean success;
    String message;
    List<PointDTO> points;
}
