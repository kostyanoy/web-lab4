package com.itmo.weblab4.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.PointDTO;
import com.itmo.weblab4.services.PointServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/points")
public class PointsController {
    private final PointServiceInterface pointService;

    public PointsController(PointServiceInterface pointService) {
        this.pointService = pointService;
    }

    @GetMapping
    public ResponseEntity<ObjectNode> getPoints(@RequestParam double r) {
        return pointService.getPoints(r);
    }

    @PostMapping()
    public ResponseEntity<ObjectNode> createPoint(@RequestBody PointDTO body) {
        return pointService.addPoint(body.getX(), body.getY(), body.getR());
    }

    @PostMapping(value = "/reset")
    public ResponseEntity<ObjectNode> resetPoints() {
        return pointService.resetPoints();
    }

}
