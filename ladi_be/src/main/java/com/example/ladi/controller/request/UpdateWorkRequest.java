package com.example.ladi.controller.request;

import com.example.ladi.model.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateWorkRequest {
    private int id;
    private int timeIn;
    private int timeOut;
    private int donGiao;
    private int donHoanThanh;
    private String ghiChu;
    private Account account;
    private int nhanVienId;
}
