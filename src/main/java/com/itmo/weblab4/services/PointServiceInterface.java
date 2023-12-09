package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.annotations.ExecutionTimeMeasured;
import org.springframework.http.ResponseEntity;

public interface PointServiceInterface {
    @ExecutionTimeMeasured
    ResponseEntity<ObjectNode> getPoints(double r);

    ResponseEntity<ObjectNode> addPoint(double x, double y, double r);

    ResponseEntity<ObjectNode> resetPoints();
}
