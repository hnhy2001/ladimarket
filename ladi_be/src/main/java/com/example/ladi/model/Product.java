package com.example.ladi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product")
public class Product extends BaseEntity{
    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private int status;

    @Column(name = "shopcode")
    private String shopcode;

    @Column(name = "note")
    private String note;

    @Column(name = "giaban")
    private Double giaBan;

    @Column(name = "gianhap")
    private Double giaNhap;
}
