package com.example.ladi.controller;

import com.example.ladi.model.Shop;
import com.example.ladi.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.ladi.service.BaseService;
import com.example.ladi.controller.reponse.BaseResponse;


@RestController
@RequestMapping("/shop")
public class ShopController extends BaseController<Shop> {
    @Autowired
    ShopService shopService;
    @Override
    protected BaseService<Shop> getService() {
        return shopService;
    }

    @GetMapping()
    public BaseResponse getAllByStatus(@RequestParam(name = "status") int status){
        return shopService.getAllByStatus(status);
    }
}
