package com.itmo.weblab4.services;

import com.itmo.weblab4.entities.Role;
import com.itmo.weblab4.entities.User;
import com.itmo.weblab4.repos.RoleRepository;
import com.itmo.weblab4.repos.UserRepository;
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
    private final AuthenticationManager authenticationManager;

    public AuthenticalService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) return null;

        String encodedPassword = passwordEncoder.encode(password);
        Role role = roleRepository.findByAuthority("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        return userRepository.save(new User(0, username, encodedPassword, true, roles));
    }
}
