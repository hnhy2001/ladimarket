package com.example.ladi.configurations.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCConnection {
    public static Connection getJDBCConnection() throws SQLException, ClassNotFoundException {
        final String url = "jdbc:mysql://52.221.9.159:3306/ladi";
        final String user = "login01";
        final String password = "ladI#0922";

        Class.forName("com.mysql.jdbc.Driver");  
        return DriverManager.getConnection(url, user, password);
    }
}
