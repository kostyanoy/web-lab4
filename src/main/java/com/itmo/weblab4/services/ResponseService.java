package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    private final ObjectMapper mapper;

    public ResponseService(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public ResponseEntity<ObjectNode> success() {
        ObjectNode response = mapper.createObjectNode();
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ObjectNode> fail() {
        ObjectNode response = mapper.createObjectNode();
        response.put("success", false);
        return ResponseEntity.badRequest().body(response);
    }
}
