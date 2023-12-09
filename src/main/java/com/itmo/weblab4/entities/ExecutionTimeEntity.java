package com.itmo.weblab4.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "method_execution_time_web_lab4")
@Data
@NoArgsConstructor
public class ExecutionTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "measure_id")
    private Integer id;
    private String component;
    private String method;
    @Column(name="start_ts")
    private long startTs;
    @Column(name="exec_time")
    private long executionTime;

    public ExecutionTimeEntity(String component, String method, long startTs, long executionTime) {
        this.component = component;
        this.method = method;
        this.startTs = startTs;
        this.executionTime = executionTime;
    }
}
