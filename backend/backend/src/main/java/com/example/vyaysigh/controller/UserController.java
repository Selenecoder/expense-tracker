package com.example.vyaysigh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/dashboard")
    public String getUserDashboard() {
        return "Welcome to the User Dashboard!";
    }

    // Add more user-specific endpoints here
}
