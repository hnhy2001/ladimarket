package com.example.ladi.service.impl;

import com.example.ladi.model.Account;
import com.example.ladi.model.CostType;
import com.example.ladi.repository.AccountRepository;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.CostTypeRepository;
import com.example.ladi.service.CostTypeService;
import org.springframework.stereotype.Service;

@Service
public class CostTypeServiceImpl extends BaseServiceImpl<CostType> implements CostTypeService {
    private CostTypeRepository costTypeRepository;

    public CostTypeServiceImpl(CostTypeRepository costTypeRepository){
        this.costTypeRepository = costTypeRepository;
    }
    @Override
    protected BaseRepository<CostType> getRepository() {
        return costTypeRepository;
    }
}
