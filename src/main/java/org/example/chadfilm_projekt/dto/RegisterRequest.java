package org.example.chadfilm_projekt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Nazwa uzytkownika jest wymagana")
    private String username;

    @NotBlank(message = "Email uzytkownika jest wymagany")
    @Email(message = "Niepoprawny format adresu email")
    private String email;

    @NotBlank(message = "haslo jest wymagane")
    @Size(min = 6, message = "Haslo musi miec conajmniej 6 znakow")
    private String password;

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
}
