package org.example.chadfilm_projekt.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.chadfilm_projekt.model.User;
import org.example.chadfilm_projekt.service.UserService;
import org.example.chadfilm_projekt.dto.RegisterRequest;


@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
//        try{
//            User newUser = userService.registerUser(
//                    registerRequest.getUsername(),
//                    registerRequest.getEmail(),
//                    registerRequest.getPassword()
//            );
//            newUser.setPasswordHash(null);
//            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
//        }catch(RuntimeException e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }

}
