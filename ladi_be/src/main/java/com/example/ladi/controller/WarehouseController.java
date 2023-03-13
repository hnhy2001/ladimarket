package com.example.ladi.controller;

import com.example.ladi.model.Warehouse;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController extends BaseController<Warehouse> {
    @Autowired
    WarehouseService warehouseService;
    @Override
    protected BaseService<Warehouse> getService() {
        return warehouseService;
    }
}
