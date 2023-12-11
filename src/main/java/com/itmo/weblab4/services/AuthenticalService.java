package com.itmo.weblab4.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itmo.weblab4.annotations.ExecutionTimeMeasured;
import com.itmo.weblab4.entities.RoleEntity;
import com.itmo.weblab4.entities.UserEntity;
import com.itmo.weblab4.repos.RoleRepository;
import com.itmo.weblab4.repos.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticalService implements AuthenticalServiceInterface {
    private final ResponseServiceInterface responseService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticalService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, ResponseServiceInterface responseService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.responseService = responseService;
    }

    @Override
    @ExecutionTimeMeasured
    public ResponseEntity<ObjectNode> registerUser(String username, String password) {
        if (username == null || password == null) {
            return responseService.fail("Username or password is null!");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return responseService.fail("Username exists");
        }

        String encodedPassword = passwordEncoder.encode(password);
        RoleEntity role = roleRepository.findByAuthority("USER").get();
        Set<RoleEntity> roles = new HashSet<>();
        roles.add(role);

        try {
            userRepository.save(new UserEntity(0, username, encodedPassword, true, roles));
            return responseService.success("Created user");
        } catch (Exception e) {
            return responseService.fail("Can't create user");
        }

    }
}
