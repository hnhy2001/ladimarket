package com.example.ladi.controller.request;

import java.util.List;

import com.example.ladi.model.Data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AssignJobRequest {
    public Integer staffId;
    public List<Data> data;
}
