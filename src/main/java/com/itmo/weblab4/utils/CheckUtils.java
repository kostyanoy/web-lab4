package com.itmo.weblab4.utils;

import org.springframework.stereotype.Component;

@Component
public class CheckUtils {
    public boolean isInsideRectangle(double x, double y, double height, double width) {
        return Math.abs(x) <= width && Math.abs(y) <= height;
    }

    public boolean isInsideCircle(double x, double y, double radius) {
        return x * x + y * y <= radius * radius;
    }

    public boolean isInsideRhombus(double x, double y, double height, double width) {
        return Math.abs(x) / width + Math.abs(y) / height <= 1;
    }

    public boolean checkPoint(double x, double y, double r) {
        return (x >= 0 && y >= 0 && isInsideCircle(x, y, r / 2))
                || (x >= 0 && y <= 0 && isInsideRhombus(x, y, r / 2, r / 2))
                || (x <= 0 && y <= 0 && isInsideRectangle(x, y, r, r));
    }
}
