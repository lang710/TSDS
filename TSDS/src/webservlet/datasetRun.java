package webservlet;

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

@WebServlet("/dsrun")
public class datasetRun extends HttpServlet {

    //调用twitter算法模块对数据集进行时序预测
    private String callTSAlgorithm(String[] cmdArr,int model) throws IOException, InterruptedException{

        String filename=cmdArr[3];
        dbquery myQuery=new dbquery();
        myQuery.setConn();
        String statement="";

        if(model==1) {
            statement = "select resultImgPath from dataset where name = '" + filename + "'";
        }else if(model==2){
            statement = "select resultImgPath2 from dataset where name= '" + filename+ "'";
        }

        ResultSet rs=myQuery.query(statement);
        try {
            if (rs.next()) {
                String imgPath="";
                if(model==1)
                    imgPath=rs.getString("resultImgPath");
                else if(model==2)
                    imgPath=rs.getString("resultImgPath2");
                if(imgPath!=null&&!imgPath.equals("")) {
                    myQuery.closeConn();
                    return imgPath;
                }
            }
        }catch(SQLException se){
            se.printStackTrace();
        }

        Process process=Runtime.getRuntime().exec(cmdArr);
        process.waitFor();
        InputStream is=process.getInputStream();
        DataInputStream dis=new DataInputStream(is);

        //调用相应的算法之后会生成一张时序异常检测图片同时返回图片的生成路径，
        // 用dis.readLine()保存该路径，用于在前端进行显示
        String imgPath;
        imgPath=dis.readLine();
        while(imgPath!=null){
            String tmp=dis.readLine();
            if(tmp!=null)
                imgPath=tmp;
            else
                break;
        }
        System.out.println(imgPath);
        if(model==1)
            statement="update dataset set resultImgPath ='"+imgPath+"' where name='"+filename+"'";
        else if(model==2)
            statement="update dataset set resultImgPath2 ='"+imgPath+"' where name='"+filename+"'";
        myQuery.update(statement);
        myQuery.closeConn();

        return imgPath;
    }


    //对Get方法进行响应
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("run");

        String exe="python3";

        //获取当前web路径映射的主机绝对路径
        ServletContext servletContext = request.getServletContext();
        String uploadPath = servletContext.getRealPath("/");

        //获取python文件所在的绝对路径
        String command=uploadPath+"WEB-INF/classes/algorithm/python/pyculiarity/getOutGraph.py";
        String path = uploadPath+"WEB-INF/classes/dataset/";

        //获取文件名称
        String filename = request.getParameter("filename");

        int model=Integer.parseInt(request.getParameter("model"));

        //调用python的shell指令及参数
        String[] cmdArr={};
        if(model==1) {
            cmdArr = new String[]{exe, command, path, filename};
        }
        else if(model==2) {
            command=uploadPath+"WEB-INF/classes/algorithm/python/xgboost/detect.py";
            cmdArr = new String[]{exe, command, path, filename, "xgb_model_835"};
        }

        try {

            for(int i=0;i<cmdArr.length;i++)
                System.out.println(cmdArr[i]);
            String imgPath = callTSAlgorithm(cmdArr,model);
            System.out.println(imgPath);

            //将imgPath存放到Session中
            HttpSession sess=request.getSession();
            sess.setAttribute("imgPath",imgPath);
            response.sendRedirect("jsp/static.jsp");

            //out.print(result);
        }catch(InterruptedException e){
            System.out.println(e);
        }

    }
}
