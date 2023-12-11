package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;

public interface ResponseServiceInterface {
    ResponseEntity<ObjectNode> success(String message);

    ResponseEntity<ObjectNode> fail(String message);
}
