package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.LoginRequest;
import com.example.ladi.model.Account;
import com.example.ladi.service.AcountService;
import com.example.ladi.service.BaseService;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("account")
@CrossOrigin
public class AcountController extends BaseController<Account> {
    private AcountService acountService;
    public AcountController(AcountService acountService){
        this.acountService = acountService;
    }
    @Override
    protected BaseService<Account> getService() {
        return acountService;
    }

    @PostMapping("/login")
    public BaseResponse login(@RequestBody LoginRequest loginRequest) throws NoSuchAlgorithmException {
        return acountService.login(loginRequest.getUserName(), loginRequest.getPassWord());
    }
    @PostMapping("create")
    @Override
    public BaseResponse create(@RequestBody Account account) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(account.getPassWord().getBytes());
        byte[] digest = md.digest();
        String myHash = DatatypeConverter.printHexBinary(digest).toUpperCase();
        account.setPassWord(myHash);
        return new BaseResponse(200, "Tạo thành công!", this.getService().create(account));
    }
}
