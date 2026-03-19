package com.mani.ecommerceSpring.controller;

import com.mani.ecommerceSpring.model.Product;
import com.mani.ecommerceSpring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @PostMapping
    public Product addProcduct(@RequestBody Product product){
        return productRepository.save(product);
    }
    @GetMapping
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(required = false) String query) {
        if (query == null || query.trim().isEmpty()) {
            return productRepository.findAll();
        }

        String normalizedQuery = query.trim();
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                normalizedQuery,
                normalizedQuery
        );
    }

}
