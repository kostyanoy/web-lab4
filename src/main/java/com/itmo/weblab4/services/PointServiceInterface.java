package com.itmo.weblab4.services;

import com.itmo.weblab4.dto.CommonResponseDTO;
import com.itmo.weblab4.dto.PointsResponseDTO;

public interface PointServiceInterface {
    PointsResponseDTO getPoints(double r);

    CommonResponseDTO addPoint(double x, double y, double r);

    CommonResponseDTO resetPoints();
}
