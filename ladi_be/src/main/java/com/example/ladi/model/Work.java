package com.example.ladi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "work")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Work extends BaseEntity{

    @Column(name = "timeint")
    private int timeIn;

    @Column(name = "timeout")
    private int timeOut;

    @Column(name = "don_giao")
    private int donGiao;

    @Column(name = "don_hoan_thanh")
    private int donHoanThanh;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "nhanvienid")
    private int nhanVienId;
}
