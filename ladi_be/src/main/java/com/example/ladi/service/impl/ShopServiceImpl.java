package com.example.ladi.service.impl;

import com.example.ladi.configurations.JwtTokenProvider;
import com.example.ladi.model.Account;
import com.example.ladi.model.Shop;
import com.example.ladi.repository.AccountRepository;
import com.example.ladi.repository.ShopRepository;
import com.example.ladi.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.ladi.repository.BaseRepository;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import com.example.ladi.controller.reponse.BaseResponse;
import org.springframework.util.StringUtils;

@Service
public class ShopServiceImpl extends BaseServiceImpl<Shop> implements ShopService {

    @Autowired
    ShopRepository shopRepository;

    @Autowired
    AccountRepository accountRepository;
    @Override
    protected BaseRepository<Shop> getRepository() {
        return shopRepository;
    }

    @Override
    public BaseResponse getAllByStatus(int status, String jwt) {
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String bearerToken = getJwtFromRequest(jwt);
        String userName = jwtTokenProvider.getAccountUserNameFromJWT(bearerToken);
        Account account = accountRepository.findByUserName(userName);
        List<Shop> shopList = new ArrayList<>();
        if (status == -1){
            if (account.getRole().equals("admin")){
                shopList = shopRepository.findAll();
            }
            else {
                String[] shopCodes = account.getShop().split(",");
                for (String item : shopCodes) {
                    shopList.addAll(shopRepository.findAllByCode(item));
                }
            }
        }
        else {
            if (account.getRole().equals("admin")){
                shopList = shopRepository.findAllByStatus(status);
            }
            else {
                String[] shopCodes = account.getShop().split(",");
                for (String item : shopCodes) {
                    shopList.addAll(shopRepository.findAllByStatusAndCode(status, item));
                }
            }
        }
        return new BaseResponse(200, "OK", shopList);
    }
    private String getJwtFromRequest(String bearerToken) {
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
