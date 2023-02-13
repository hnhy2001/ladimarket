package com.example.ladi.controller;

import com.example.ladi.model.CostType;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.CostTypeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("costtype")
@CrossOrigin
@PreAuthorize("hasAuthority('admin')")
public class CostTypeController extends BaseController<CostType>{

    CostTypeService costTypeService;
    public CostTypeController(CostTypeService costTypeServicee){
        this.costTypeService = costTypeServicee;
    }
    @Override
    protected BaseService<CostType> getService() {
        return this.costTypeService;
    }
}
