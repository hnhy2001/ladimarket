package com.example.ladi.repository;

import com.example.ladi.model.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DataRepository extends JpaRepository<Data, Integer> {
    List<Data> findAll();
    Data findAllById(int id);

    @Query("SELECT d FROM Data d WHERE (:status is null or d.status = :status)")
    List<Data> findAllByStatus(@Param("status") int status);

}
