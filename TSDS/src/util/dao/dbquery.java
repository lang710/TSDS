package util.dao;

import java.sql.*;

public class dbquery {

    private String DB_DRIVER = "com.mysql.cj.jdbc.Driver";
    private String DB_URL = "jdbc:mysql://localhost:3306/sample?serverTimezone=GMT";
    private String DB_USER = "root";
    private String DB_PASSWORD = "cl19960525eebb";

    private Connection conn;


    public void setConn(){
        try{
            Class.forName(DB_DRIVER);
            conn=DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWORD);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public ResultSet query(String statement){
        try {
            PreparedStatement prepstmt=conn.prepareStatement(statement);
            return prepstmt.executeQuery();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public int update(String statement){
        try{
            PreparedStatement prepstmt=conn.prepareStatement(statement);
            return prepstmt.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        return 0;
    }

    public void closeConn(){
        try{
            conn.close();
        }catch(SQLException se){
            se.printStackTrace();
        }
    }
}
