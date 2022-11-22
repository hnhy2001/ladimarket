package com.example.ladi.repository;

import com.example.ladi.model.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DataRepository extends BaseRepository<Data> {
    List<Data> findAll();
    Data findAllById(int id);

    @Query("SELECT d FROM Data d WHERE (:status is null or d.status = :status) AND (d.date BETWEEN :startDate AND :endDate)")
    List<Data> findAllByStatus(@Param("status") Integer status, @Param("startDate") String startDate, @Param("endDate") String endDate);

    @Query("SELECT d FROM Data d WHERE d.date > :startDate AND d.date < :endDate")
    List<Data> findAllByDate( @Param("startDate") String startDate, @Param("endDate") String endDate);
}
