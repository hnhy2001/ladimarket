package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.CheckOut;
import com.example.ladi.model.Work;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("work")
@CrossOrigin
public class WorkController extends BaseController<Work>{
    @Autowired
    WorkService workService;
    @Override
    protected BaseService<Work> getService() {
        return workService;
    }

}
