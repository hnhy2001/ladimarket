package com.example.ladi.controller.request;


import com.example.ladi.model.Product;


public class DataRequest {

    private Long id;

    private String name;

    private String phone;

    private String street;

    private String country;

    private String state;

    private String district;

    private String ward;

    private String product;

    private  int status;

    private Long date;

    private String link;

    private String ipAddress;

    private Long dateChanged;

    private Product productDto;

    private String utm_source;

    private String utm_medium;

    private String utm_campation;

    private String utm_term;

    private String utm_content;

    private String variant_url;

    private Double price;

    private String message;

    private String note;

    private String shopCode;

    private Long nhanVienId;

    private Long dateOnly;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Long getDateChanged() {
        return dateChanged;
    }

    public void setDateChanged(Long dateChanged) {
        this.dateChanged = dateChanged;
    }

    public Product getProductDto() {
        return productDto;
    }

    public void setProductDto(Product productDto) {
        this.productDto = productDto;
    }

    public String getUtm_source() {
        return utm_source;
    }

    public void setUtm_source(String utm_source) {
        this.utm_source = utm_source;
    }

    public String getUtm_medium() {
        return utm_medium;
    }

    public void setUtm_medium(String utm_medium) {
        this.utm_medium = utm_medium;
    }

    public String getUtm_campation() {
        return utm_campation;
    }

    public void setUtm_campation(String utm_campation) {
        this.utm_campation = utm_campation;
    }

    public String getUtm_term() {
        return utm_term;
    }

    public void setUtm_term(String utm_term) {
        this.utm_term = utm_term;
    }

    public String getUtm_content() {
        return utm_content;
    }

    public void setUtm_content(String utm_content) {
        this.utm_content = utm_content;
    }

    public String getVariant_url() {
        return variant_url;
    }

    public void setVariant_url(String variant_url) {
        this.variant_url = variant_url;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getShopCode() {
        return shopCode;
    }

    public void setShopCode(String shopCode) {
        this.shopCode = shopCode;
    }

    public Long getNhanVienId() {
        return nhanVienId;
    }

    public void setNhanVienId(Long nhanVienId) {
        this.nhanVienId = nhanVienId;
    }

    public Long getDateOnly() {
        return dateOnly;
    }

    public void setDateOnly(Long dateOnly) {
        this.dateOnly = dateOnly;
    }

    public DataRequest(){}

    public DataRequest(Long id, String name, String phone, String street, String country, String state, String district, String ward, String product, int status, Long date, String link, String ipAddress, Long dateChanged, Product productDto, String utm_source, String utm_medium, String utm_campation, String utm_term, String utm_content, String variant_url, Double price, String message, String note, String shopCode, Long nhanVienId, Long dateOnly) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.street = street;
        this.country = country;
        this.state = state;
        this.district = district;
        this.ward = ward;
        this.product = product;
        this.status = status;
        this.date = date;
        this.link = link;
        this.ipAddress = ipAddress;
        this.dateChanged = dateChanged;
        this.productDto = productDto;
        this.utm_source = utm_source;
        this.utm_medium = utm_medium;
        this.utm_campation = utm_campation;
        this.utm_term = utm_term;
        this.utm_content = utm_content;
        this.variant_url = variant_url;
        this.price = price;
        this.message = message;
        this.note = note;
        this.shopCode = shopCode;
        this.nhanVienId = nhanVienId;
        this.dateOnly = dateOnly;
    }



}
