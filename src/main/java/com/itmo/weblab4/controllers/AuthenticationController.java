package com.itmo.weblab4.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.CommonResponseDTO;
import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.services.AuthenticalServiceInterface;
import com.itmo.weblab4.services.ResponseServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AuthenticationController {
    private final AuthenticalServiceInterface authenticalService;
    private final ResponseServiceInterface responseService;

    public AuthenticationController(AuthenticalServiceInterface authenticalService, ResponseServiceInterface responseService) {
        this.authenticalService = authenticalService;
        this.responseService = responseService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<CommonResponseDTO> registerUser(@RequestBody RegistrationDTO body) {
        CommonResponseDTO response = authenticalService.registerUser(body.getUsername(), body.getPassword());
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/login")
    public ResponseEntity<CommonResponseDTO> login() {
        return new ResponseEntity<>(new CommonResponseDTO(false, "GET on /login is useless"), HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/valid")
    public ResponseEntity<CommonResponseDTO> valid() {
        return new ResponseEntity<>(new CommonResponseDTO(true, "Request valid"), HttpStatus.OK);
    }
}
