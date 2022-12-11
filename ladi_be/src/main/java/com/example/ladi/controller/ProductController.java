package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.model.Product;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController extends BaseController<Product> {
    @Autowired
    ProductService productService;
    @Override
    protected BaseService<Product> getService() {
        return productService;
    }

    @GetMapping()
    public BaseResponse getAllByShopcodeAndStatus(@RequestParam(name = "shopCode") String  shopcode, @RequestParam(name = "status") int status){
        return productService.getAllByShopcodeAndStatus(shopcode, status);
    }
}
