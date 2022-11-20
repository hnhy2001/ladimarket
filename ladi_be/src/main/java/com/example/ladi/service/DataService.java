package com.example.ladi.service;

import com.example.ladi.controller.reponse.BaseResponse;
import com.example.ladi.controller.request.AssignJobRequest;
import com.example.ladi.model.Data;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public interface DataService extends BaseService<Data> {

    public List<Data> getByStatus(Integer status);
    public List<Data> getAllBySearchKey(String searchKey);
    public BaseResponse assignWork(AssignJobRequest request);
}
