package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.entities.Role;
import com.itmo.weblab4.entities.User;
import com.itmo.weblab4.repos.RoleRepository;
import com.itmo.weblab4.repos.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticalService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper mapper;


    public AuthenticalService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, ObjectMapper mapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
    }

    public ResponseEntity<ObjectNode> registerUser(String username, String password) {
        ObjectNode response = mapper.createObjectNode();

        if (userRepository.findByUsername(username).isPresent()) {
            response.put("success", false);
            return ResponseEntity.badRequest().body(response);
        }

        String encodedPassword = passwordEncoder.encode(password);
        Role role = roleRepository.findByAuthority("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        userRepository.save(new User(0, username, encodedPassword, true, roles));

        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}
