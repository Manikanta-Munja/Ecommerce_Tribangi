package com.mani.ecommerceSpring.controller;
import com.mani.ecommerceSpring.model.Order;
import com.mani.ecommerceSpring.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping("/place")
    public Order placeOrder(@RequestParam Long userId) {
        return orderService.placeOrder(userId);
    }

    @PostMapping("/place-item")
    public Order placeOrderForSingleItem(@RequestParam Long userId,
                                         @RequestParam Long cartItemId) {
        return orderService.placeOrderForCartItem(userId, cartItemId);
    }
}