package com.itmo.weblab4.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.services.AuthenticalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private final AuthenticalService authenticalService;

    public AuthenticationController(AuthenticalService authenticalService, ObjectMapper mapper) {
        this.authenticalService = authenticalService;
    }

    @PostMapping(value = "/registration")
    public ResponseEntity<ObjectNode> registerUser(@RequestBody RegistrationDTO body) {
        return authenticalService.registerUser(body.getUsername(), body.getPassword());
    }

    @GetMapping("/login")
    public String login() {
        return """
                <form action="/login" method="post">
                    <div><label> User Name : <input type="text" name="username"/> </label></div>
                    <div><label> Password: <input type="password" name="password"/> </label></div>
                    <div><input type="submit" value="Sign In"/></div>
                </form>""";
    }
}
