package com.example.ladi.controller.request;

import com.example.ladi.dto.AccountDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.repository.NoRepositoryBean;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

    public DataRequest() {
    }

    public DataRequest(Long id, String name, String phone, String street, String country, String state, String district, String ward, String product, int status, Long date, String link, String ipAddress, Long dateChanged, String utmSource, String utmMedium, String utmCampation, String utmTerm, String utmContent, String variantUrl, Double price, String message, String note, String shopCode, Long nhanVienId) {
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
        this.utmSource = utmSource;
        this.utmMedium = utmMedium;
        this.utmCampation = utmCampation;
        this.utmTerm = utmTerm;
        this.utmContent = utmContent;
        this.variantUrl = variantUrl;
        this.price = price;
        this.message = message;
        this.note = note;
        this.shopCode = shopCode;
        this.nhanVienId = nhanVienId;
    }

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

    public String getUtmSource() {
        return utmSource;
    }

    public void setUtmSource(String utmSource) {
        this.utmSource = utmSource;
    }

    public String getUtmMedium() {
        return utmMedium;
    }

    public void setUtmMedium(String utmMedium) {
        this.utmMedium = utmMedium;
    }

    public String getUtmCampation() {
        return utmCampation;
    }

    public void setUtmCampation(String utmCampation) {
        this.utmCampation = utmCampation;
    }

    public String getUtmTerm() {
        return utmTerm;
    }

    public void setUtmTerm(String utmTerm) {
        this.utmTerm = utmTerm;
    }

    public String getUtmContent() {
        return utmContent;
    }

    public void setUtmContent(String utmContent) {
        this.utmContent = utmContent;
    }

    public String getVariantUrl() {
        return variantUrl;
    }

    public void setVariantUrl(String variantUrl) {
        this.variantUrl = variantUrl;
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

    private String utmSource;

    private String utmMedium;

    private String utmCampation;

    private String utmTerm;

    private String utmContent;

    private String variantUrl;

    private Double price;

    private String message;

    private String note;

    private String shopCode;

    private Long nhanVienId;
}
