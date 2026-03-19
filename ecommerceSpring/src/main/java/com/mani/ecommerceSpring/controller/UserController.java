package com.mani.ecommerceSpring.controller;


import com.mani.ecommerceSpring.model.User;
import com.mani.ecommerceSpring.dto.LoginRequest;
import com.mani.ecommerceSpring.dto.LoginResponse;
import com.mani.ecommerceSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 📝 Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new LoginResponse(null, "Email already exists"));
        }
        user.setRole(User.Role.USER);
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(new LoginResponse(savedUser, "Registration successful"));
    }

    // 🔐 Login User
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        var user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok(new LoginResponse(user.get(), "Login successful"));
        }
        return ResponseEntity.badRequest().body(new LoginResponse(null, "Invalid email or password"));
    }

    // 📥 Get All Users
    @GetMapping
    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }
}