package com.example.ladi.service.impl;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.PostCostRequest;
import com.example.ladi.dto.CostDto;
import com.example.ladi.model.Cost;
import com.example.ladi.model.CostType;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.CostRepository;
import com.example.ladi.repository.CostTypeRepository;
import com.example.ladi.service.CostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CostServiceImpl extends BaseServiceImpl<Cost> implements CostService {
    CostRepository costRepository;
    public CostServiceImpl(CostRepository costRepository){
        this.costRepository = costRepository;
    }
    @Override
    protected BaseRepository<Cost> getRepository() {
        return this.costRepository;
    }

    @Autowired
    CostTypeRepository costTypeRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public BaseResponse postCost(PostCostRequest postCostRequest) {
        Cost cost = new Cost();
        if (postCostRequest.getId() == null){
            cost = modelMapper.map(postCostRequest, Cost.class);
            cost.setCostType(costTypeRepository.findAllById(postCostRequest.getCostTypeId()));
            costRepository.save(cost);
        }else {
            cost = modelMapper.map(postCostRequest, Cost.class);
            cost.setCostType(costTypeRepository.findAllById(postCostRequest.getCostTypeId()));
            costRepository.save(cost);

        }
        return new BaseResponse(200, "Ok", cost);
    }

    @Override
    public BaseResponse getCost() {
        List<Cost> costList = costRepository.findAll();
        List<CostDto> costDtoList = new ArrayList<>();
        for (Cost item : costList) {
              CostDto costDto = CostDto.builder()
                      .id(item.getId())
                      .code(item.getCode())
                      .name(item.getName())
                      .status(item.getStatus())
                      .costPerDay(item.getCostPerDay())
                      .numOfOrder(item.getNumOfOrder())
                      .fromDate(item.getFromDate())
                      .toDate(item.getToDate())
                      .totalCost(item.getTotalCost())
                      .numOfOrder(item.getNumOfOrder())
                      .build();
            if (item.getCostType() != null){
                costDto.setCostType(item.getCostType().getId());
            }
            costDtoList.add(costDto);
        }
        return new BaseResponse(200, "OK", costDtoList);
    }

    @Override
    public BaseResponse laySoDonTheoThoiGian(String startDate, String endDate) {

        return new BaseResponse(200, "OK", costRepository.laySoDonTheoThoiGian(Long.parseLong(startDate), Long.parseLong(endDate)));
    }
}
