package com.mani.ecommerceSpring.repository;

import com.mani.ecommerceSpring.model.Cart;
import com.mani.ecommerceSpring.model.CartItem;
import com.mani.ecommerceSpring.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    Optional<CartItem> findByIdAndCart(Long id, Cart cart);
}