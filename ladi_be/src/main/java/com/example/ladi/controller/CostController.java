package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.PostCostRequest;
import com.example.ladi.model.Cost;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.CostService;
import com.example.ladi.service.impl.CostServiceImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cost")
@CrossOrigin
@PreAuthorize("hasAuthority('admin')")
public class CostController extends BaseController<Cost>{
    CostService costService;
    public CostController(CostService costService){
        this.costService = costService;
    }
    @Override
    protected BaseService<Cost> getService() {
        return this.costService;
    }

    @PostMapping("/postcost")
    public BaseResponse postCost(@RequestBody PostCostRequest postCostRequest){
        return costService.postCost(postCostRequest);
    }

    @GetMapping("/getCost")
    public BaseResponse getCost(){
        return costService.getCost();
    }

    @GetMapping("/laysodontheothoigian")
    public BaseResponse laySoDonTheoThoiGian(@RequestParam String startDate, @RequestParam String endDate){
        return costService.laySoDonTheoThoiGian(startDate, endDate);
    }
}
