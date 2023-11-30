package com.itmo.weblab4.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.services.AuthenticalService;
import com.itmo.weblab4.services.ResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private final AuthenticalService authenticalService;
    private final ResponseService responseService;

    public AuthenticationController(AuthenticalService authenticalService, ResponseService responseService) {
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
