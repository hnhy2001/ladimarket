package com.example.ladi.repository;

import com.example.ladi.model.Account;
import com.example.ladi.model.UtmMedium;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtmMediumRepository extends BaseRepository<UtmMedium> {
    List<UtmMedium> findAll();
    List<UtmMedium> findAllByAccount(Account account);

}
