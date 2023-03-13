package com.example.ladi.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "warehouse")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Warehouse extends BaseEntity{
    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "config_shop")
    private String configShop;

    @Column(name = "phone_number")
    private String phoneNumber;

}
