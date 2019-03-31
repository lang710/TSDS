package webservlet;

import util.dao.dbquery;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/dsdelete")
public class datasetDelete extends HttpServlet {

    private void toDeleteByID(String id){
        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String statement="delete from dataset where id='"+id+"'";
        myQuery.update(statement);
        myQuery.closeConn();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id=request.getParameter("id");
        toDeleteByID(id);
        response.sendRedirect("/dstable");
    }
}
