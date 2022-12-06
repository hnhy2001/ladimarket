package com.example.ladi.service.impl;

import com.example.ladi.model.Shop;
import com.example.ladi.repository.ShopRepository;
import com.example.ladi.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.ladi.repository.BaseRepository;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import com.example.ladi.controller.reponse.BaseResponse;

@Service
public class ShopServiceImpl extends BaseServiceImpl<Shop> implements ShopService {

    @Autowired
    ShopRepository shopRepository;
    @Override
    protected BaseRepository<Shop> getRepository() {
        return shopRepository;
    }

    @Override
    public BaseResponse getAllByStatus(int status) {
        if (status == -1){
            List<Shop> shopList = shopRepository.findAll();
            return new BaseResponse(200, "OK", shopList);
        }
        List<Shop> shopList = shopRepository.findAllByStatus(status);
        return new BaseResponse(200, "OK", shopList);
    }
}
