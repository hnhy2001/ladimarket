package com.example.ladi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatisticPerformanceSaleDto {
    private String fullName;
    private int donGiao;
    private int donHoanThanh;
    private int donThanhCong;
}
