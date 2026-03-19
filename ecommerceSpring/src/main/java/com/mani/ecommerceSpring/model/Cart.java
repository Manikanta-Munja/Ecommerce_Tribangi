package com.mani.ecommerceSpring.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One user has one cart
    @OneToOne
    private User user;

    // One cart has many items
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonManagedReference

    private List<CartItem> items;
}