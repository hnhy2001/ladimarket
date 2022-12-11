package com.example.ladi.repository;

import com.example.ladi.model.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends BaseRepository<Product> {
    List<Product> findAllByStatus(int status);
    List<Product> findAllByShopcodeAndStatus(String shopcode, int status);
}
