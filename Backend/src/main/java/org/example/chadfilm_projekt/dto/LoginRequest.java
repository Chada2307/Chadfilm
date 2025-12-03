package org.example.chadfilm_projekt.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message="Nazwa uzytkownika nie może być pusta!!")
    public String username;

    @NotBlank(message="Haslo nie moze byc puste!!")
    public String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
