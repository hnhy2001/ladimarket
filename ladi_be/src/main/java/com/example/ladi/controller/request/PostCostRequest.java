package com.example.ladi.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostCostRequest {
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
    private Long costTypeId;
}
