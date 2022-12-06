package com.example.ladi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DataDto {
    private Long id;
    private String phone;
    private String name;
    private String street;
    private String country;
    private String state;
    private String district;
    private String ward;
    private String product;
    private int status;
    private String date;
    private String link;
    private String ipAddress;
    private String dateChanged;
    private String staffName;
    private Double price;
    private String shopCode;
    private String message;
    private String note;
    private AccountDto account;
}
