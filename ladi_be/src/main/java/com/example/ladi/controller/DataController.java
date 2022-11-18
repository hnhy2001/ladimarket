package com.example.ladi.controller;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.dto.DataDto;
import com.example.ladi.model.Data;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.DataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/data")
@CrossOrigin
public class DataController extends BaseController<Data>{

    @Autowired
    DataService dataService;

//    @Autowired
//    ModelMapper mapper;
    
    @Override
    protected BaseService<Data> getService() {
        return dataService;
    }

    @PostMapping("create")
    public BaseResponse create(@RequestBody Data obj) throws NoSuchAlgorithmException {
//        Data data = mapper.map(entity, Data.class);

        long unixTime = Instant.now().getEpochSecond();
        obj.setDate(Long.toString(unixTime));
        return new BaseResponse(200, "Tạo thành công!", this.getService().create(obj));
    }


    @CrossOrigin
    @GetMapping("/getByStatus")
    public ResponseEntity<List<Data>> getAllByStatus(int status){
        var datas = dataService.getByStatus(status);
        return new ResponseEntity<List<Data>>(datas, HttpStatus.OK);
    }


}
