package com.itmo.weblab4.config;

import com.itmo.weblab4.handlers.AuthFailureHandler;
import com.itmo.weblab4.handlers.AuthSuccessHandler;
import com.itmo.weblab4.handlers.LogoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private final AuthSuccessHandler authSuccessHandler;
    private final AuthFailureHandler authFailureHandler;
    private final LogoutHandler logoutHandler;

    public WebSecurityConfig(AuthSuccessHandler authSuccessHandler, AuthFailureHandler authFailureHandler, LogoutHandler logoutHandler) {
        this.authSuccessHandler = authSuccessHandler;
        this.authFailureHandler = authFailureHandler;
        this.logoutHandler = logoutHandler;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService detailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(detailsService);
        return new ProviderManager(daoProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/register", "/login").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .successHandler(authSuccessHandler)
                        .failureHandler(authFailureHandler)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessHandler(logoutHandler)
                        .permitAll()
                        .deleteCookies())
                .build();
    }
}
