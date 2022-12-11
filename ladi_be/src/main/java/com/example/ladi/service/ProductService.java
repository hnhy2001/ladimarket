package com.example.ladi.service;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.model.Product;

public interface ProductService extends BaseService<Product> {
    BaseResponse getAllByShopcodeAndStatus(String shopcode, int status);
}
