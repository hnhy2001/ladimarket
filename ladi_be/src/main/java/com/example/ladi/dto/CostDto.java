package com.example.ladi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CostDto {
    Long id;
    private String code;
    private String name;
    private int status;
    private Double costPerDay;
    private int numOfDay;
    private int totalCost;
    private Long fromDate;
    private Long toDate;
    private int numOfOrder;
    private Long costType;
}
