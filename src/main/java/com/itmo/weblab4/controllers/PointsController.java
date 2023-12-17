package com.itmo.weblab4.controllers;

import com.itmo.weblab4.dto.CommonResponseDTO;
import com.itmo.weblab4.dto.PointDTO;
import com.itmo.weblab4.dto.PointsResponseDTO;
import com.itmo.weblab4.services.PointServiceInterface;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<PointsResponseDTO> getPoints(@RequestParam double r) {
        PointsResponseDTO response = pointService.getPoints(r);

        if (response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping()
    public ResponseEntity<CommonResponseDTO> createPoint(@RequestBody PointDTO body) {
        CommonResponseDTO response = pointService.addPoint(body.getX(), body.getY(), body.getR());

        if (response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value = "/reset")
    public ResponseEntity<CommonResponseDTO> resetPoints() {
        CommonResponseDTO response = pointService.resetPoints();

        if (response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
