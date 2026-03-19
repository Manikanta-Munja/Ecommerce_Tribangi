package com.mani.ecommerceSpring.repository;


import com.mani.ecommerceSpring.model.Cart;

import com.mani.ecommerceSpring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);

}