package com.itmo.weblab4.controllers;

import com.itmo.weblab4.dto.RegistrationDTO;
import com.itmo.weblab4.entities.User;
import com.itmo.weblab4.services.AuthenticalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    final AuthenticalService authenticalService;

    public AuthenticationController(AuthenticalService authenticalService) {
        this.authenticalService = authenticalService;
    }

    @PostMapping("/registration")
    public User registerUser(@RequestBody RegistrationDTO body){
        return authenticalService.registerUser(body.getUsername(), body.getPassword());
    }


//    @PostMapping("/registration")
//    public String addUser(User user) {
//        Optional<User> registeredUser = userRepository.findByUsername(user.getUsername());
//        if (registeredUser.isEmpty()) {
//            return "Lol no";
//        }
//
//        user.setActive(true);
////        user.setRoles(Collections.singleton(Role.USER));
//        userRepository.save(user);
//        return "Ok";
//    }
//
    @GetMapping("/login")
    public String login() {
        return "<form action=\"/login\" method=\"post\">\n" +
                "    <div><label> User Name : <input type=\"text\" name=\"username\"/> </label></div>\n" +
                "    <div><label> Password: <input type=\"password\" name=\"password\"/> </label></div>\n" +
                "    <div><label> Remember me: <input type=\"checkbox\" name=\"remember-me\"/> </label></div>\n" +
                "    <div><input type=\"submit\" value=\"Sign In\"/></div>\n" +
                "</form>";
    }
}
