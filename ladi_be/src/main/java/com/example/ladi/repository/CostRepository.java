package com.example.ladi.repository;

import com.example.ladi.dto.SoDonTheoThoiGianDto;
import com.example.ladi.model.Cost;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CostRepository extends BaseRepository<Cost>{
    @Query(nativeQuery = true)
    SoDonTheoThoiGianDto laySoDonTheoThoiGian(Long startDate, Long endDate);

    @Query(value = "select * from cost where from_date >= :startDate and to_date <= :endDate", nativeQuery = true)
    List<Cost> findAllCostByTimeRange(Long startDate, Long endDate);

    @Query(value = "select * from cost where from_date >= :startDate and to_date <= :endDate and name = :userName", nativeQuery = true)
    List<Cost> findAllCostByTimeRangeAndName(Long startDate, Long endDate, String userName);
}
