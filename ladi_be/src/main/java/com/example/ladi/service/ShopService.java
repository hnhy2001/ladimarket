package com.example.ladi.service;

import com.example.ladi.model.Shop;
import com.example.ladi.controller.reponse.BaseResponse;
import java.util.List;

public interface ShopService extends BaseService<Shop> {
    BaseResponse getAllByStatus(int status, String jwt);
}
