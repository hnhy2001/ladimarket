package com.example.ladi.controller.request;

import com.example.ladi.dto.AccountDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateWorkRequest {
    private Long timeIn;
    private Long timeOut;
    private int donGiao;
    private int donHoanThanh;
    private int donXuLy;
    private String ghiChu;
    private int donThanhCong;
    private Long nhanVienId;
}
