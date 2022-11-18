package com.example.ladi.extentions;

import java.time.Instant;

public class datetimeExtention {

    public static String getCurrentUnixDate() {
        long unixTime = Instant.now().getEpochSecond();
        
        System.out.println(unixTime);
        return Long.toString(unixTime);
    }
}
