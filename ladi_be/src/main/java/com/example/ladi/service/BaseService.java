package com.example.ladi.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;


public interface BaseService<T> {
    public List<T> getAll();
    public T create(T t);
    public T update(T t) throws NoSuchAlgorithmException;
    public T getById(Long id);
    public String deleteById(Long id);
}
