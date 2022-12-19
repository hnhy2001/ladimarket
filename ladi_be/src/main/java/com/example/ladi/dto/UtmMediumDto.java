package com.example.ladi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtmMediumDto {
    private Long id;
    private String code;
    private String note;
    private AccountDto account;
}
