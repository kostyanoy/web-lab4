package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.PointDTO;
import com.itmo.weblab4.entities.PointEntity;
import com.itmo.weblab4.repos.PointRepository;
import com.itmo.weblab4.repos.UserRepository;
import com.itmo.weblab4.utils.CheckUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PointService {
    private final UserRepository userRepository;
    private final ResponseService responseService;
    private final PointRepository pointRepository;
    private final CheckUtils checkUtils;

    public PointService(ResponseService responseService, PointRepository pointRepository, UserRepository userRepository, CheckUtils checkUtils) {
        this.responseService = responseService;
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
        this.checkUtils = checkUtils;
    }

    public ResponseEntity<ObjectNode> getPoints(double r) {
        try {
            Integer userId = getCurrentUserId();


            List<PointEntity> pointEntities = (r <= 0) ?
                    pointRepository.findAllByUserIdAndIsDeleted(userId, false) :
                    pointRepository.findAllByUserIdAndRAndIsDeleted(userId, r, false);


            List<PointDTO> points = pointEntities
                    .stream()
                    .map(p -> new PointDTO(p.getX(), p.getY(), p.getR(), p.isResult(), p.getCheckDate()))
                    .toList();

            ResponseEntity<ObjectNode> response = responseService.success("Found points");
            ArrayNode arrayNode = response.getBody().putArray("points");
            points.forEach(p -> arrayNode.addPOJO(p));
            return response;
        } catch (Exception e) {
            return responseService.fail("Can't get points");
        }
    }

    public ResponseEntity<ObjectNode> addPoint(double x, double y, double r) {
        try {
            PointEntity point = new PointEntity(null, getCurrentUserId(), x, y, r, new Date(), checkUtils.checkPoint(x, y, r), false);
            pointRepository.save(point);
            return responseService.success("Point saved");
        } catch (Exception e) {
            return responseService.fail("Can't save point");
        }
    }

    public ResponseEntity<ObjectNode> resetPoints() {
        try {
            List<PointEntity> points = pointRepository.findAllByUserIdAndIsDeleted(getCurrentUserId(), false);
            points.forEach(p -> p.setDeleted(true));
            pointRepository.saveAll(points);
            return responseService.success("Marked points to delete");
        } catch (Exception e) {
            return responseService.fail("Can't mark points to delete");
        }
    }

    private Integer getCurrentUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No such user")).getUserId();
    }
}
