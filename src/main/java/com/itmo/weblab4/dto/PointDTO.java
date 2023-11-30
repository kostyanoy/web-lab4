package com.itmo.weblab4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class PointDTO {
    private double x;
    private double y;
    private double r;
    private boolean result;
    private Date time;
}
