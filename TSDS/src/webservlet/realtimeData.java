package webservlet;

import util.dao.dbquery;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/rtdata")
public class realtimeData extends HttpServlet {

    private static int uid=0;

    private String toGetData(){
        String timestamps="",values="";
        dbquery myQuery = new dbquery();
        myQuery.setConn();
        String statement="select id, time, value, kpi_id from simulatorTS where id>'"+uid+"' order by id";
        ResultSet myResult=myQuery.query(statement);
        try {
            while (myResult.next()) {
                uid=myResult.getInt("id");
                timestamps+=myResult.getString("time")+"|";
                values+=myResult.getString("value")+"|";
            }
        }catch (SQLException se){
            se.printStackTrace();
        }
        return timestamps.substring(0,timestamps.length()-1)+","+values.substring(0,values.length()-1);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String results=toGetData();
        //System.out.println(results);
        response.getWriter().println(results);
    }
}
