package com.example.ladi.model;

import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "data")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Data {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "street")
    private String street;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "district")
    private String district;

    @Column(name = "ward")
    private String ward;

    @Column(name = "product")
    private String product;

    @Column(name = "status")
    private  int status;

    @Column(name = "date")
    private Long date;

    @Column(name = "link")
    private String link;

    @Column(name = "ipaddress")
    private String ipAddress;

    @Column(name = "datechanged")
    private Long dateChanged;

    @Column(name = "utm_source")
    private String utmSource;

    @Column(name = "utm_medium")
    private String utmMedium;

    @Column(name = "utm_campaign")
    private String utmCampation;

    @Column(name = "utm_term")
    private String utmTerm;

    @Column(name = "utm_content")
    private String utmContent;

    @Column(name = "variant_url ")
    private String variantUrl;

    @Column(name = "price")
    private Double price;

    @Column(name = "message")
    private String message;

    @Column(name = "note")
    private String note;

    @Column(name = "shopcode")
    private String shopCode;

    @ManyToOne
    @JoinColumn(name = "nhanvienid")
    Account account;

    @ManyToOne
    @JoinColumn(name = "productid")
    Product productDto;
}
