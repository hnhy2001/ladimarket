package com.example.ladi.service;

import com.example.ladi.model.Data;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public interface DataService extends BaseService<Data> {

    public List<Data> getByStatus(int status);
}
