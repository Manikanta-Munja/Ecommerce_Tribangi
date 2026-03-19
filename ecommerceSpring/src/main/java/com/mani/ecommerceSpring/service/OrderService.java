package com.mani.ecommerceSpring.service;
import com.mani.ecommerceSpring.model.*;
import com.mani.ecommerceSpring.repository.CartItemRepository;
import com.mani.ecommerceSpring.repository.CartRepository;

import com.mani.ecommerceSpring.repository.OrderRepository;
import com.mani.ecommerceSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    
    @Autowired
    private UserRepository userRepository;

    public List<Order> getOrdersByUserId(Long userId) {
        userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User not found with id: " + userId));

        return orderRepository.findByUserIdOrderByIdDesc(userId);
    }

    @Transactional
    public Order placeOrder(Long userId) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User not found with id: " + userId));

        Cart cart = cartRepository.findByUser(user)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Cart not found for user id: " + userId));

        List<CartItem> cartItems = new ArrayList<>(cart.getItems() == null ? List.of() : cart.getItems());
        if (cartItems.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cart is empty. Add products before placing order.");
        }

        Order savedOrder = createOrderFromCartItems(user, cartItems);

        // Explicit delete guarantees ordered items are removed from cart table.
        cartItemRepository.deleteAll(cartItems);
        if (cart.getItems() != null) {
            cart.getItems().clear();
        }
        cartRepository.save(cart);

        return savedOrder;
    }

    @Transactional
    public Order placeOrderForCartItem(Long userId, Long cartItemId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User not found with id: " + userId));

        Cart cart = cartRepository.findByUser(user)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Cart not found for user id: " + userId));

        CartItem cartItem = cartItemRepository.findByIdAndCart(cartItemId, cart)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Cart item not found: " + cartItemId));

        Order savedOrder = createOrderFromCartItems(user, List.of(cartItem));

        cartItemRepository.delete(cartItem);
        if (cart.getItems() != null) {
            cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        }
        cartRepository.save(cart);

        return savedOrder;
    }

    private Order createOrderFromCartItems(User user, List<CartItem> cartItems) {
        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());

            total += cartItem.getProduct().getPrice() * cartItem.getQuantity();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }
}