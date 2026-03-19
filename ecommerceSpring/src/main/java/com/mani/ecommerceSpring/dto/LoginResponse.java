package com.mani.ecommerceSpring.dto;

import com.mani.ecommerceSpring.model.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String message;
    
    public LoginResponse(User user, String message) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole().toString();
        this.message = message;
    }
}
