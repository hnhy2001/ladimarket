package com.example.ladi.service;

import com.example.ladi.dto.UtmMediumDto;
import com.example.ladi.model.UtmMedium;

import java.util.List;

public interface UtmMediumService extends BaseService<UtmMedium> {
    public List<UtmMediumDto> getAllData(String jwt);
}
