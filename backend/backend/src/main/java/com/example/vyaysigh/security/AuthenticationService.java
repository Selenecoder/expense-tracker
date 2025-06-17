package com.example.vyaysigh.security;

import com.example.vyaysigh.dto.LoginRequest;
import com.example.vyaysigh.dto.RegisterRequest;
import com.example.vyaysigh.model.Role;
import com.example.vyaysigh.model.RoleName;
import com.example.vyaysigh.model.User;
import com.example.vyaysigh.repository.RoleRepository;
import com.example.vyaysigh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(LoginRequest loginRequest) {
        System.out.println("Login email: " + loginRequest.getEmail());

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        System.out.println("User found? " + userOpt.isPresent());

        if (userOpt.isEmpty()) {
            System.out.println("User not found in DB.");
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userOpt.get();

        boolean match = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        System.out.println("Password matches: " + match);

        if (!match) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return jwtTokenProvider.generateToken(user);
    }

    public String signUp(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // ✅ Use encoder without manually adding {bcrypt}
        String encryptedPassword = passwordEncoder.encode(registerRequest.getPassword());

        Set<Role> roles = new HashSet<>();

        // Assign role(s) based on email or flags
        if (registerRequest.getEmail().endsWith("@admin.com")) {
            Optional<Role> adminRole = roleRepository.findByName(RoleName.ADMIN);
            adminRole.ifPresent(roles::add);
        }

        Optional<Role> userRole = roleRepository.findByName(RoleName.USER);
        userRole.ifPresent(roles::add); // always add USER role

        if (roles.isEmpty()) {
            throw new RuntimeException("No roles could be assigned");
        }

        User user = new User(
                registerRequest.getEmail(),
                encryptedPassword,
                registerRequest.getUsername(),
                registerRequest.getFullName(),
                roles);

        userRepository.save(user);

        return jwtTokenProvider.generateToken(user);
    }
}
