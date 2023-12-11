package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;

public interface PointServiceInterface {
    ResponseEntity<ObjectNode> getPoints(double r);

    ResponseEntity<ObjectNode> addPoint(double x, double y, double r);

    ResponseEntity<ObjectNode> resetPoints();
}
