<%@ page import="javabean.datasetbean" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.checkSessAttr" %><%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2018/12/1
  Time: 下午5:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>AIOps异常检测</title>
    <link rel="stylesheet" href="commonstyle.css"/>
    <script type="text/javascript">
        function F_Open_dialog() {
            document.getElementById("myFile").click();
        }

        function UploadFile(){
            document.getElementById("submitFile").click();
        }
    </script>
</head>
<body>

<div id="headline">
    <span id="headTag1">AIOps</span>
    <span id="headTag2"><a href="anomaly.jsp">异常视图</a></span>
    <span id="headTag3"><a href="sample.jsp">样本库</a></span>
</div>

<!--
<div id="sidebar">
  <div id="sideTag1">异常视图</div>
  <span id="sideTag2">异常查询</span>
</div>
-->

<div class="flex-container">
    <div class="flex-sidebar">
        <div id="sideTag1">样本库</div>
        <div id="sideTag2">样本管理</div>
        <div id="sideTag3">训练模型</div>
    </div>
    <div class="flex-content">
        <div class="flex-container-column">
            <div class="flex-h2line">样本管理</div>
            <div class="flex-h2content">
                日期：<input type="date" name="starttime">
                <input type="date" name="endtime">

                <!--<input type="file" id="btn_file" style="display:none">-->

                <form action="uploadFile" method="post" enctype="multipart/form-data" style="display:none">
                    <input type="file" id="myFile" name="myFile"  onchange="UploadFile()">
                    <input type="submit" id="submitFile" value="上传资源">
                </form>
                <button type="button" onclick="F_Open_dialog()">导入样本</button>

                <button type="button" onclick="alert('Hello World!')">导出样本</button>
                <button type="button" onclick="alert('Hello World!')">编辑</button>
                搜索：<input type="text" />
                <br>
                <br>
                <table border="1" rules=rows  cellspacing="10" cellpadding="10" valign="center" >
                    <tr>
                        <th align="center"><input type="checkbox"></th>
                        <th align="center">指标集名称</th>
                        <th align="center">指标名称</th>
                        <th align="center">样本来源</th>
                        <th align="center">时间</th>
                        <th align="center">训练/测试集</th>
                        <th align="center">正/负样本</th>
                        <th align="center">时间窗口(分钟)</th>
                        <th align="center">操作</th>
                    </tr>

                    <%
                        checkSessAttr check=new checkSessAttr();
                        if(check.checkName(request,"list")==false)
                            response.sendRedirect("/getListServlet");
                        else {
                            List<datasetbean> list=(List)session.getAttribute("list");
                            for(datasetbean alist:list){
                    %>
                    <tr>
                        <td align="center"><input type="checkbox"></td>
                        <td align="center">demo_17019</td>
                        <td align="center"><%=alist.getId()%></td>
                        <td align="center"><%=alist.getName()%></td>
                        <td align="center"><%=alist.getTimestamp()%></td>
                        <td align="center">测试集</td>
                        <td align="center">负样本</td>
                        <td align="center">180</td>
                        <td align="center"><a href="pyculiarity?filename=<%=alist.getName()%>">查看</a>&nbsp<a href="">编辑</a>&nbsp<a href="">删除</a></td>
                    </tr>
                    <%
                            }
                        }
                    %>
                </table>

                <div id="myModal" class="modal">
                    <span class="close" style="display:none;" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
                <%if(check.checkName(request,"imgPath")==true) {%>
                    <img class="modal-content" id="img01" src="img/<%=(String)session.getAttribute("imgPath")%>">
                </div>
                <link rel="stylesheet" href="popstyle.css"/>
                <script>
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    var span = document.getElementsByClassName("close")[0];
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                </script>
                <%}%>
            </div>
        </div>
    </div>
</div>

</body>

</html>