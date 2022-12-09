package com.example.ladi.service.impl;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.model.Product;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.ProductRepository;
import com.example.ladi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    protected BaseRepository<Product> getRepository() {
        return productRepository;
    }

    @Override
    public BaseResponse getAllByStatus(int status) {

        List<Product> productList = new ArrayList<>();
        if (status == -1){
            productList = productRepository.findAll();
        }
        else {
            productList = productRepository.findAllByStatus(status);
        }
        return new BaseResponse(200, "OK", productList);
    }

}
