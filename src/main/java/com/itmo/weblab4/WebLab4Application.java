package com.itmo.weblab4;

import com.itmo.weblab4.entities.RoleEntity;
import com.itmo.weblab4.entities.UserEntity;
import com.itmo.weblab4.repos.RoleRepository;
import com.itmo.weblab4.repos.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WebLab4Application {

    public static void main(String[] args) {
        SpringApplication.run(WebLab4Application.class, args);
    }

    // init database
    @Bean
    CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.findByAuthority("ADMIN").isPresent()) return;

            RoleEntity adminRole = roleRepository.save(new RoleEntity("ADMIN"));
            roleRepository.save(new RoleEntity("USER"));

            Set<RoleEntity> roles = new HashSet<>();
            roles.add(adminRole);

            UserEntity admin = new UserEntity(1, "admin", passwordEncoder.encode("password"), true, roles);
            userRepository.save(admin);
        };
    }
}
