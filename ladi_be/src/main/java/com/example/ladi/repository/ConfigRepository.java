package com.example.ladi.repository;

import com.example.ladi.model.Config;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConfigRepository extends BaseRepository<Config> {
    public Config findAllByCode(String code);

    @Query(value = "select * from config where from_date >= :startDate and to_date <= :endDate", nativeQuery = true)
    List<Config> findConfigByDate(Long startDate, Long endDate);
}
