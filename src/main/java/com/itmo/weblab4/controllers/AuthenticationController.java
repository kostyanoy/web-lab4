package com.itmo.weblab4.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.services.AuthenticalServiceInterface;
import com.itmo.weblab4.services.ResponseServiceInterface;
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
    public ResponseEntity<ObjectNode> registerUser(@RequestBody RegistrationDTO body) {
        return authenticalService.registerUser(body.getUsername(), body.getPassword());
    }

    @GetMapping("/login")
    public ResponseEntity<ObjectNode> login() {
        return responseService.fail("GET on /login is useless");
    }

    @GetMapping("/valid")
    public ResponseEntity<ObjectNode> valid() {
        return responseService.success("Request valid");
    }
}
