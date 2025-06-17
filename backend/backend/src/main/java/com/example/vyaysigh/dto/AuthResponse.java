package com.example.vyaysigh.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String message;
    private boolean success;

    // Constructor for successful authentication
    public AuthResponse(String token, String username, String message) {
        this.token = token;
        this.username = username;
        this.message = message;
        this.success = true;

    }

    // Constructor for error response
    public static AuthResponse error(String errorMessage) {
        AuthResponse response = new AuthResponse();
        response.message = errorMessage;
        response.success = false;
        return response;
    }

    // Default constructor for error factory method
    private AuthResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }
}