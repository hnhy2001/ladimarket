package com.example.ladi.service;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.model.Account;

import java.security.NoSuchAlgorithmException;

public interface AcountService extends BaseService<Account> {
    public BaseResponse login(String userName, String password) throws NoSuchAlgorithmException;
}
