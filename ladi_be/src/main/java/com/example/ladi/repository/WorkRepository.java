package com.example.ladi.repository;

import com.example.ladi.model.Work;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends BaseRepository<Work>{
    List<Work> findAllByIsActive(int isActive);
}
