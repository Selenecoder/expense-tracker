package com.example.vyaysigh.controller;

import com.example.vyaysigh.dto.LoginRequest;
import com.example.vyaysigh.dto.AuthResponse;
import com.example.vyaysigh.dto.RegisterRequest;
import com.example.vyaysigh.model.User;
import com.example.vyaysigh.repository.UserRepository;
import com.example.vyaysigh.service.CustomUserDetailsService;
import com.example.vyaysigh.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7); // Remove "Bearer " prefix
            String userEmail = jwtService.extractUsername(jwt);
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Error fetching user details: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            // Generate JWT token
            String jwt = jwtService.generateToken(userDetails);

            // Fetch username from DB using email
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            String username = user.getUsername();

            // Return success response with message
            return ResponseEntity.ok(new AuthResponse(jwt, username, "Login successful"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(AuthResponse.error("Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            // Create new user
            User user = new User();
            user.setFullName(request.getFullName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            // Save user
            userRepository.save(user);

            // Generate JWT for new user
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String jwt = jwtService.generateToken(userDetails);

            // Return success response with message
            return ResponseEntity.ok(new AuthResponse(jwt, user.getUsername(), "Signup successful"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(AuthResponse.error("Signup failed: " + e.getMessage()));
        }
    }
}
