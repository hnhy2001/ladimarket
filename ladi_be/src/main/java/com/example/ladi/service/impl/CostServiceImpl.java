package com.example.ladi.service.impl;

import com.example.ladi.configurations.JwtTokenProvider;
import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.PostCostRequest;
import com.example.ladi.dto.CostDto;
import com.example.ladi.dto.StatisticUtmByDateDto;
import com.example.ladi.model.Account;
import com.example.ladi.model.Config;
import com.example.ladi.model.Cost;
import com.example.ladi.model.CostType;
import com.example.ladi.repository.*;
import com.example.ladi.service.CostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CostServiceImpl extends BaseServiceImpl<Cost> implements CostService {
    CostRepository costRepository;

    public CostServiceImpl(CostRepository costRepository) {
        this.costRepository = costRepository;
    }

    @Override
    protected BaseRepository<Cost> getRepository() {
        return this.costRepository;
    }

    @Autowired
    CostTypeRepository costTypeRepository;

    @Autowired
    ConfigRepository configRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    DataRepository dataRepository;

    @Autowired
    AccountRepository accountRepository;


    @Override
    public BaseResponse postCost(PostCostRequest postCostRequest) {
        Cost cost = new Cost();
        if (postCostRequest.getId() == null) {
            cost = modelMapper.map(postCostRequest, Cost.class);
            cost.setCostType(costTypeRepository.findAllById(postCostRequest.getCostTypeId()));
            costRepository.save(cost);
        } else {
            cost = modelMapper.map(postCostRequest, Cost.class);
            cost.setCostType(costTypeRepository.findAllById(postCostRequest.getCostTypeId()));
            costRepository.save(cost);

        }
        return new BaseResponse(200, "Ok", cost);
    }

    @Override
    public BaseResponse getCost() {
        List<Cost> costList = costRepository.findAll();
        List<CostDto> costDtoList = mapCostToCostDto(costList);
        return new BaseResponse(200, "OK", costDtoList);
    }

    @Override
    public BaseResponse laySoDonTheoThoiGian(String startDate, String endDate) {

        return new BaseResponse(200, "OK", costRepository.laySoDonTheoThoiGian(Long.parseLong(startDate), Long.parseLong(endDate)));
    }

    @Override
    public BaseResponse getAllCostByTimeRange(String startDate, String endDate, String jwt) {
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String bearerToken = getJwtFromRequest(jwt);
        String userName = jwtTokenProvider.getAccountUserNameFromJWT(bearerToken);
        Account account = accountRepository.findByUserName(userName);
        if (account.getRole().equals("admin")) {
            List<Cost> costList = costRepository.findAllCostByTimeRange(Long.parseLong(startDate), Long.parseLong(endDate));
            return new BaseResponse(200, "OK", costList);
        }
        if (account.getRole().equals("marketing")){
            List<Cost> costList = costRepository.findAllCostByTimeRangeAndName(Long.parseLong(startDate), Long.parseLong(endDate), account.getUserName());
            return new BaseResponse(200, "OK", costList);
        }
        return new BaseResponse(200, "OK", null);
    }

    @Scheduled(cron = "0 1 00 * * ?", zone = "Asia/Saigon")
    public BaseResponse createCostTransport(){
        Config config = configRepository.findAllByCode("CPVC");
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime yesterday = currentDate.minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String date = yesterday.format(formatter);
        List<StatisticUtmByDateDto> statisticUtmByDateDtos = dataRepository.statisticUtmByDate(Long.parseLong(date), Long.parseLong(date), "KHBOM");
        int numOfOrder = 0;
        for (StatisticUtmByDateDto item : statisticUtmByDateDtos){
            numOfOrder = numOfOrder + item.getCount();
        }
        int totalCost = 1;
        if (Long.parseLong(date) < config.getFromDate() || Long.parseLong(date) > config.getToDate()){
            totalCost = Integer.parseInt(config.getDefaultValue()) * numOfOrder;
        }else {
            totalCost = Integer.parseInt(config.getValue()) * numOfOrder;
        }
        CostType costType = costTypeRepository.findAllById(Long.valueOf(8));
        Cost cost = Cost.builder()
                .code(date+date)
                .name("System")
                .status(1)
                .numOfDay(1)
                .fromDate(Long.parseLong(date))
                .toDate(Long.parseLong(date))
                .numOfOrder(numOfOrder)
                .totalCost(totalCost)
                .numOfOrder(numOfOrder)
                .costPerDay(totalCost*1.0)
                .costType(costType)
                .build();
        costRepository.save(cost);
        return new BaseResponse(200, "OK", cost);
    }

    public List<CostDto> mapCostToCostDto(List<Cost> costList) {
        List<CostDto> costDtoList = new ArrayList<>();
        for (Cost item : costList) {
            CostDto costDto = CostDto.builder().id(item.getId()).code(item.getCode()).name(item.getName()).status(item.getStatus()).costPerDay(item.getCostPerDay()).numOfDay(item.getNumOfDay()).fromDate(item.getFromDate()).toDate(item.getToDate()).totalCost(item.getTotalCost()).numOfOrder(item.getNumOfOrder()).build();
            if (item.getCostType() != null) {
                costDto.setCostType(item.getCostType().getId());
            }
            costDtoList.add(costDto);
        }
        return costDtoList;
    }

    private String getJwtFromRequest(String bearerToken) {
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
