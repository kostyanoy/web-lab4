package com.itmo.weblab4.controllers;

import com.itmo.weblab4.dto.CommonResponseDTO;
import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.services.AuthenticalServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AuthenticationController {
    private final AuthenticalServiceInterface authenticalService;

    public AuthenticationController(AuthenticalServiceInterface authenticalService) {
        this.authenticalService = authenticalService;
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
        return new ResponseEntity<>(new CommonResponseDTO(false, "Please authorize"), HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/valid")
    public ResponseEntity<CommonResponseDTO> valid() {
        return new ResponseEntity<>(new CommonResponseDTO(true, "Request valid"), HttpStatus.OK);
    }
}
