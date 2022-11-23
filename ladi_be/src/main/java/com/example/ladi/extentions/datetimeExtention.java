package com.example.ladi.extentions;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class datetimeExtention {

    public static String getCurrentUnixDate() {
        LocalDateTime currentDate = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String date = currentDate.format(formatter);
        return date;
    }
}
