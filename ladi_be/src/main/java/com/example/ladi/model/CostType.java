package com.example.ladi.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity(name = "cost_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CostType extends BaseEntity{
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "status")
    private int status = 1;

    @Column(name = "period")
    private int priod = -1;

    @Column(name = "is_count_order")
    private int isCountOrder = -1;

}
