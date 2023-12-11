package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;

public interface AuthenticalServiceInterface {
    ResponseEntity<ObjectNode> registerUser(String username, String password);
}
