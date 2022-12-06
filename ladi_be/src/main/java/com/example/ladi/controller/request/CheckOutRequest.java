package com.example.ladi.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckOutRequest {
    private Long id;
    private Long timeOut;
    private int donGiao;
    private int donHoanThanh;
}
