

package com.mani.ecommerceSpring.repository;
import com.mani.ecommerceSpring.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}