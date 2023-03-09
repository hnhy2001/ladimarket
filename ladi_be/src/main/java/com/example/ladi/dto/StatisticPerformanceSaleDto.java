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
    private String percentDonHoanThanh;
    private String percentDonThanhCong;

    public StatisticPerformanceSaleDto(String fullName, int donGiao, int donHoanThanh, int donThanhCong) {
        this.fullName = fullName;
        this.donGiao = donGiao;
        this.donHoanThanh = donHoanThanh;
        this.donThanhCong = donThanhCong;
        this.percentDonHoanThanh = "100";
        this.percentDonThanhCong = "100";
    }
}
