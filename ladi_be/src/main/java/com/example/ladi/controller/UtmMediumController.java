package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.model.UtmMedium;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.UtmMediumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/utmmedium")
@CrossOrigin
public class UtmMediumController extends BaseController<UtmMedium> {

    @Autowired
    UtmMediumService utmMediumService;
    @Override
    protected BaseService<UtmMedium> getService() {
        return utmMediumService;
    }

    @GetMapping("")
    public BaseResponse getAllData(@RequestHeader(name = "Authorization") String jwt){
        return new BaseResponse(0,"Lấy dữ liệu thành công",utmMediumService.getAllData(jwt));
    }


}
