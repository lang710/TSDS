package webservlet;

import util.dao.dbquery;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;

import static util.time.timeTrans.*;

@WebServlet("/dsupload")
@MultipartConfig()
public class datasetUpload extends HttpServlet {

    //将数据集记录存储到数据库中
    private void insertFile(String name,String dataset){
        String datetime=getCurrentDatetime();
        String date=getCurrentYMD();
        String time=getCurrentHMS();
        System.out.println(date);
        System.out.println(time);
        System.out.println(datetime);

        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String sql="insert into "+dataset+" (name, datetime, date, time) values('"+name+"','"+datetime+"','"+date+"','"+time+"')";
        myQuery.update(sql);
        myQuery.closeConn();
    }

    private String getFilename(Part part) {
        String header = part.getHeader("Content-Disposition");
        String filename = header.substring(header.indexOf("filename=\"") + 10, header.lastIndexOf("\""));
        return filename;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        request.setCharacterEncoding("UTF-8");//为了处理中文文件名
        Part part = request.getPart("myFile");//使用getPart()获得Part对象
        String filename = getFilename(part);//获取文件名

        ServletContext servletContext = request.getServletContext();
        String uploadPath = servletContext.getRealPath("/");
        System.out.println(uploadPath);
        part.write(uploadPath+"WEB-INF/classes/dataset/"+filename);//上传文件到本地路径

        insertFile(filename,"dataset");
        response.sendRedirect("/dstable");
    }

}
