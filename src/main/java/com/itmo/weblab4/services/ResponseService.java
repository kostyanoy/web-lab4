package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResponseService implements ResponseServiceInterface {

    private final ObjectMapper mapper;

    public ResponseService(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public ResponseEntity<ObjectNode> success(String message) {
        ObjectNode response = mapper.createObjectNode();
        response.put("success", true);
        if (message != null) {
            response.put("message", message);
        }
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<ObjectNode> fail(String message) {
        ObjectNode response = mapper.createObjectNode();
        if (message != null) {
            response.put("message", message);
        }
        response.put("success", false);
        return ResponseEntity.badRequest().body(response);
    }
}
