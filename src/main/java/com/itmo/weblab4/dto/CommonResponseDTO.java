package com.itmo.weblab4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommonResponseDTO {
    boolean success;
    String message;
}
