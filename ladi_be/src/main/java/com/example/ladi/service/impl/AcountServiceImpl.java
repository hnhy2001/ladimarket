package com.example.ladi.service.impl;

import com.example.ladi.configurations.AccountDetails;
import com.example.ladi.configurations.JwtTokenProvider;
import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.reponse.LoginResponse;
import com.example.ladi.model.Account;
import com.example.ladi.repository.AccountRepository;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.service.AcountService;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AcountServiceImpl extends BaseServiceImpl<Account> implements AcountService {
    private AccountRepository acountRepository;

    public AcountServiceImpl(AccountRepository acountRepository){
        this.acountRepository = acountRepository;
    }
    @Override
    protected BaseRepository<Account> getRepository() {
        return acountRepository;
    }

    @Override
    public BaseResponse login(String userName, String password) throws NoSuchAlgorithmException {
        Account account = acountRepository.findByUserName(userName);
        if (account == null){
            return new BaseResponse(500, "Account không tồn tại", null);
        }
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        String myChecksum = DatatypeConverter
                .printHexBinary(digest).toUpperCase();
        if (!account.getPassWord().equals(myChecksum)){
            return new BaseResponse(500, "Mật khẩu không chính xác", null);
        }
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        LoginResponse loginResponse = new LoginResponse(jwtTokenProvider.generateToken(new AccountDetails(account)), account.getId(), account.getUserName(), account.getFullName());
        return new BaseResponse(200, "OK", loginResponse);
    }
}
