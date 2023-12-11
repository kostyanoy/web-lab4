package com.itmo.weblab4.repos;

import com.itmo.weblab4.entities.ExecutionTimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExecutionTimeRepository extends JpaRepository<ExecutionTimeEntity, Integer> {
}
