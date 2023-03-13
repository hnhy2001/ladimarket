package com.example.ladi.service.impl;

import com.example.ladi.model.Warehouse;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.WarehouseRepository;
import com.example.ladi.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WarehouseServiceImpl extends BaseServiceImpl<Warehouse> implements WarehouseService {
    @Autowired
    WarehouseRepository warehouseRepository;
    @Override
    protected BaseRepository<Warehouse> getRepository() {
        return warehouseRepository;
    }
}
