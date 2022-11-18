package com.example.ladi.service.impl;

import com.example.ladi.controller.request.UpdateWorkRequest;
import com.example.ladi.model.Work;
import com.example.ladi.repository.BaseRepository;
import com.example.ladi.repository.WorkRepository;
import com.example.ladi.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkServiceImpl extends BaseServiceImpl<Work> implements WorkService {
    @Autowired
    WorkRepository workRepository;

    @Override
    protected BaseRepository<Work> getRepository() {
        return workRepository;
    }
}
