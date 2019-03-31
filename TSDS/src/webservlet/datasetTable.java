package webservlet;

import javabean.datasetbean;
import util.dao.dbquery;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/dstable")
public class datasetTable extends HttpServlet {

    private List getList(String dataset) {

        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String sql="select * from "+dataset+" order by id";
        ResultSet result=myQuery.query(sql);

        List<datasetbean> list=new ArrayList<>();

        try {
            while (result.next()) {
                int id = result.getInt("id");
                String name = result.getString("name");
                String timestamp=result.getString("datetime");
                //String timestamp=time.toString().substring(0,19);

                list.add(new datasetbean(id,name,timestamp));
            }

        }catch(SQLException se){
            se.printStackTrace();
        }

        myQuery.closeConn();
        return list;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //String res=request.getParameter("res");
        List<datasetbean> list=getList("dataset");
        HttpSession sess=request.getSession();
        sess.setAttribute("list",list);

        response.sendRedirect("jsp/static.jsp");
    }

}
