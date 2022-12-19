package com.example.ladi.service.impl;

import com.example.ladi.configurations.JwtTokenProvider;
import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.dto.DataDto;
import com.example.ladi.dto.UtmMediumDto;
import com.example.ladi.model.Account;
import com.example.ladi.model.UtmMedium;
import com.example.ladi.repository.AccountRepository;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.UtmMediumRepository;
import com.example.ladi.service.UtmMediumService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;


@Service
public class UtmMediumServiceImpl extends BaseServiceImpl<UtmMedium> implements UtmMediumService {

    @Autowired
    UtmMediumRepository utmMediumRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AccountRepository accountRepository;
    @Override
    protected BaseRepository<UtmMedium> getRepository() {
        return utmMediumRepository;
    }

    public List<UtmMediumDto> getAllData(String jwt){
        List<UtmMediumDto> utmMediumDtoList= new ArrayList<>();
        List<UtmMedium> utmMediumList = new ArrayList<>();
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String bearerToken = getJwtFromRequest(jwt);
        String userName = jwtTokenProvider.getAccountUserNameFromJWT(bearerToken);
        Account account = accountRepository.findByUserName(userName);
        if(account.getRole().equals("admin")){
            utmMediumList = utmMediumRepository.findAll();
        }
        else if(account.getRole().equals("marketing")){
            utmMediumList = utmMediumRepository.findAllByAccount(account);
        }
        for (int i = 0; i < utmMediumList.size(); i++) {
            UtmMediumDto utmMediumDto = modelMapper.map(utmMediumList.get(i), UtmMediumDto.class);
            utmMediumDtoList.add(utmMediumDto);
        }
        return utmMediumDtoList;
    }


    private String getJwtFromRequest(String bearerToken) {
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
