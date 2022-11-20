package com.example.ladi.service.impl;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.AssignJobRequest;
import com.example.ladi.dto.DataDto;
import com.example.ladi.model.Account;
import com.example.ladi.model.Data;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.DataRepository;
import com.example.ladi.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class DataServiceImpl extends BaseServiceImpl<Data> implements DataService {
    @Autowired
    DataRepository dataRepository;
    @Override
    protected BaseRepository<Data> getRepository() {
        return dataRepository;
    }

    public List<Data> getByStatus(Integer status) {
        List<Data> datas = dataRepository.findAllByStatus(status);
        return datas;
    }

    @Override
    public List<Data> getAllBySearchKey(String searchKey) {
        List<Data> datas = dataRepository.findAllBySearchKey(searchKey);
        return datas;
    }

    @Override
    public BaseResponse assignWork(AssignJobRequest request) {
        
        return null;
    }
}
