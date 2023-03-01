package com.example.ladi.repository;

import com.example.ladi.dto.StatisticDataByDateAndStatusDto;
import com.example.ladi.dto.StatisticPerformanceSaleDto;
import com.example.ladi.model.Account;
import com.example.ladi.model.Work;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends BaseRepository<Work>{
    List<Work> findAllByIsActive(int isActive);
    Work findAllByIsActiveAndAccount(int isActive, Account account);
    List<Work> findAllByAccount(Account account);

    @Query(nativeQuery = true)
    List<StatisticPerformanceSaleDto> statisticPerformanceSale(Long startDate, Long endDate);
}
