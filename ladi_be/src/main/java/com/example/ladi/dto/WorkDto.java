package com.example.ladi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkDto {
    private Long id;
    private Long timeIn;
    private Long timeOut;
    private int donGiao;
    private int donHoanThanh;
    private int donXuLy;
    private String ghiChu;
    private AccountDto acount;
}
