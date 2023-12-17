package com.itmo.weblab4.services;

import com.itmo.weblab4.annotations.ExecutionTimeMeasured;
import com.itmo.weblab4.dto.CommonResponseDTO;
import com.itmo.weblab4.dto.PointDTO;
import com.itmo.weblab4.dto.PointsResponseDTO;
import com.itmo.weblab4.entities.PointEntity;
import com.itmo.weblab4.repos.PointRepository;
import com.itmo.weblab4.repos.UserRepository;
import com.itmo.weblab4.utils.CheckUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PointService implements PointServiceInterface {
    private final UserRepository userRepository;
    private final PointRepository pointRepository;
    private final CheckUtils checkUtils;

    public PointService(PointRepository pointRepository, UserRepository userRepository, CheckUtils checkUtils) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
        this.checkUtils = checkUtils;
    }

    @Override
    @ExecutionTimeMeasured
    public PointsResponseDTO getPoints(double r) {
        try {
            Integer userId = getCurrentUserId();

            List<PointEntity> pointEntities = (r <= 0) ?
                    pointRepository.findAllByUserIdAndIsDeleted(userId, false) :
                    pointRepository.findAllByUserIdAndRAndIsDeleted(userId, r, false);

            List<PointDTO> points = pointEntities
                    .stream()
                    .map(p -> new PointDTO(p.getX(), p.getY(), p.getR(), p.isResult(), p.getCheckDate()))
                    .toList();

            return new PointsResponseDTO(true, "Found points", points);
        } catch (Exception e) {
            return new PointsResponseDTO(false,"Can't get points", new ArrayList<>());
        }
    }

    @Override
    @ExecutionTimeMeasured
    public CommonResponseDTO addPoint(double x, double y, double r) {
        try {
            PointEntity point = new PointEntity(null, getCurrentUserId(), x, y, r, new Date(), checkUtils.checkPoint(x, y, r), false);
            pointRepository.save(point);
            return new CommonResponseDTO(true, "Point saved");
        } catch (Exception e) {
            return new CommonResponseDTO(false, "Can't save point");
        }
    }

    @Override
    @ExecutionTimeMeasured
    public CommonResponseDTO resetPoints() {
        try {
            List<PointEntity> points = pointRepository.findAllByUserIdAndIsDeleted(getCurrentUserId(), false);
            points.forEach(p -> p.setDeleted(true));
            pointRepository.saveAll(points);
            return new CommonResponseDTO(true, "Marked points to delete");
        } catch (Exception e) {
            return new CommonResponseDTO(false, "Can't mark points to delete");
        }
    }

    private Integer getCurrentUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No such user")).getUserId();
    }
}
