package com.itmo.weblab4.services;

import com.itmo.weblab4.dto.CommonResponseDTO;

public interface AuthenticalServiceInterface {
    CommonResponseDTO registerUser(String username, String password);
}
