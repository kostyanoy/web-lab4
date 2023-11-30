package com.itmo.weblab4.repos;

import com.itmo.weblab4.entities.PointEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<PointEntity, Integer> {
    List<PointEntity> findAllByUserIdAndRAndIsDeleted(Integer userId, double r, boolean isDeleted);
    List<PointEntity> findAllByUserId(Integer userId);

}
