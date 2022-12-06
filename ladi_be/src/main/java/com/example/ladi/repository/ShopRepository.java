package com.example.ladi.repository;

import com.example.ladi.model.Data;
import com.example.ladi.model.Shop;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends BaseRepository<Shop> {
    List<Shop> findAllByStatus(int status);
}
