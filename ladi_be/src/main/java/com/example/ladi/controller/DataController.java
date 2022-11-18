package com.example.ladi.controller;

import com.example.ladi.model.Data;
import com.example.ladi.service.BaseService;
import com.example.ladi.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/data")
@CrossOrigin
public class DataController extends BaseController<Data>{

    @Autowired
    DataService dataService;
    @Override
    protected BaseService<Data> getService() {
        return dataService;
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Data> createData(@RequestBody CreateDataRequest createDataRequest){
        return new ResponseEntity<Data>(dataService.createData(createDataRequest), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping
    public ResponseEntity<String> updateData(@RequestParam(name = "id", required = false) Integer id, @RequestBody UpdateDataRequest updateDataRequest){
        return new ResponseEntity<String>(dataService.updateDataById(id, updateDataRequest), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping
    public ResponseEntity<String> deleteData(@RequestParam(name = "id", required = false) Integer id){
        return new ResponseEntity<String>(dataService.deleteDataById(id), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/getByStatus")
    public ResponseEntity<List<Data>> getAllByStatus(int status){
        var datas = dataService.getByStatus(status);
        return new ResponseEntity<List<Data>>(datas, HttpStatus.OK);
    }


}
