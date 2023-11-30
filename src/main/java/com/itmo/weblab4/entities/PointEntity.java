package com.itmo.weblab4.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "point_web_lab4")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Integer pointId;
    @Column(name = "user_id")
    private Integer userId;
    private double x;
    private double y;
    private double r;
    private Date checkDate;
    private boolean result;
    private boolean isDeleted;
}
