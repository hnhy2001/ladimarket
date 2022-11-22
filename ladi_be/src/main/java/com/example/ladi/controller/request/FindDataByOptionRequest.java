package com.example.ladi.controller.request;

import com.example.ladi.dto.DateRangeDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FindDataByOptionRequest {
    public String Status;
    public DateRangeDto date;
}




