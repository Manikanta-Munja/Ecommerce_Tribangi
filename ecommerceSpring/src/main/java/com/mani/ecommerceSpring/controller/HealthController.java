package com.mani.ecommerceSpring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String health() {
        return "App is running!";
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }
}
