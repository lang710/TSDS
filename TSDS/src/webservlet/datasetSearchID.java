package webservlet;

import com.sun.xml.internal.bind.v2.model.core.ID;
import javabean.datasetbean;
import util.dao.dbquery;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/dssearchid")
public class datasetSearchID extends HttpServlet {

    private List toSearch(String dataset, String sid, String eid){
        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String sql="select * from "+dataset+" where id>= '"+sid+"' and id<='"+eid+"' order by id";
        ResultSet result=myQuery.query(sql);

        List<datasetbean> list=new ArrayList<>();

        try {
            while (result.next()) {
                int id = result.getInt("id");
                String name = result.getString("name");
                Timestamp time=result.getTimestamp("datetime");
                String timestamp=time.toString().substring(0,19);

                list.add(new datasetbean(id,name,timestamp));
            }

        }catch(SQLException se){
            se.printStackTrace();
        }

        myQuery.closeConn();
        return list;
    }

    private List toSearch(String dataset, String sid){
        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String sql="select * from "+dataset+" where id='"+sid+"' order by id";
        ResultSet result=myQuery.query(sql);

        List<datasetbean> list=new ArrayList<>();

        try {
            while (result.next()) {
                int id = result.getInt("id");
                String name = result.getString("name");
                Timestamp time=result.getTimestamp("datetime");
                String timestamp=time.toString().substring(0,19);

                list.add(new datasetbean(id,name,timestamp));
            }

        }catch(SQLException se){
            se.printStackTrace();
        }

        myQuery.closeConn();
        return list;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String IDPattern=request.getParameter("IDPattern");
        List<datasetbean> list;
        if(IDPattern.contains("-"))
            list=toSearch("dataset",IDPattern.split("-")[0], IDPattern.split("-")[1]);
        else
            list=toSearch("dataset",IDPattern.split("-")[0]);

        HttpSession sess=request.getSession();
        sess.setAttribute("list",list);

        response.sendRedirect("jsp/static.jsp");
    }
}
