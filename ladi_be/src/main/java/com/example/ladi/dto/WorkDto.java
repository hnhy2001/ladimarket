package com.example.ladi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkDto {
    private int id;
    private int timeIn;
    private int timeOut;
    private int donGiao;
    private int donHoanThanh;
    private String ghiChu;
    private AccountDto acount;
}
