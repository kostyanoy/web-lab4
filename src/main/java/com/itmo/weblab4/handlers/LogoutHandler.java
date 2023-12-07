package com.itmo.weblab4.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LogoutHandler implements LogoutSuccessHandler {
    private final ObjectMapper mapper;

    public LogoutHandler(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");

        ObjectNode json = mapper.createObjectNode();
        json.put("success", true);
        json.put("message", "Logout successful");

        mapper.writeValue(response.getWriter(), json);

        response.getWriter().flush();
        response.getWriter().close();
    }
}
