package com.example.ladi.repository;

import com.example.ladi.dto.SoDonTheoThoiGianDto;
import com.example.ladi.model.Cost;
import org.springframework.data.jpa.repository.Query;

public interface CostRepository extends BaseRepository<Cost>{
    @Query(nativeQuery = true)
    SoDonTheoThoiGianDto laySoDonTheoThoiGian(Long startDate, Long endDate);
}
