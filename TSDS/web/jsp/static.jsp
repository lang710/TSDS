<%@ page import="javabean.datasetbean" %>
<%@ page import="java.util.List" %>
<%@ page import="util.safe.checkSessAttr" %><%--
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
    <link rel="stylesheet" href="../css/commonstyle.css"/>
    <script type="text/javascript">
        function F_Open_dialog() {
            document.getElementById("myFile").click();
        }

        function UploadFile(){
            document.getElementById("submitFile").click();
        }

        function toChoose(){
            //alert("toChoose");
            var stime=document.getElementById("stime").value;
            var etime=document.getElementById("etime").value;
            //alert(stime);
            //alert(etime);
            window.location.href="/dschoose?stime="+stime+"&etime="+etime;
        }
        function toSearchByName(){
            var searchText=document.getElementById("searchText").value;
            //alert(searchText);
            window.location.href="/dssearchname?namePattern="+searchText;
        }
        function toSearchByID(){
            var searchText=document.getElementById("searchText").value;
            window.location.href="/dssearchid?IDPattern="+searchText;
        }
        function toSearchAll(){
            window.location.href="/dstable";
        }
        function toRun(obj){
            var model = document.getElementById("algoModel").value;
            var tr=obj.parentNode.parentNode;
            var filename=tr.cells[2].innerText;
            //alert("/dsrun?filename="+filename+"&model="+model);
            window.location.href="/dsrun?filename="+filename+"&model="+model;
        }
    </script>
    <script type="text/javascript" src="../js/staticJS.js" ></script>
</head>
<body>

<div id="headline">
    <span id="headTag1">AIOps</span>
    <span id="headTag2"><a href="/jsp/dynamic.jsp">异常视图</a></span>
    <span id="headTag3"><a href="/dstable">样本库</a></span>
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

                <!--<input type="file" id="btn_file" style="display:none">-->

                <form action="/dsupload" method="post" enctype="multipart/form-data" style="display:none">
                    <input type="file" id="myFile" name="myFile"  onchange="UploadFile()">
                    <input type="submit" id="submitFile" value="上传资源">
                </form>

                样本:
                <button type="button" onclick="F_Open_dialog()">导入</button>
                <button type="button" onclick="alert('Hello World!')">导出</button>

                <br><br>

                模型:
                <select name="model" id="algoModel">
                    <option value="1" selected="selected">3Sigma</option>
                    <option value="11">Isolation Forest</option>
                    <option value="12">One Class SVM</option>
                    <option value="13">Logistic Regression</option>
                    <option value="14">Decision Tree</option>
                    <option value="15">Random Forest</option>
                    <option value="2">Xgboost</option>
                </select>

                <br><br>

                搜索:<input type="text" id="searchText"/>
                <button type="button" onclick="toSearchByName()">按名称</button>
                <button type="button" onclick="toSearchByID()">按ID</button>
                <button type="button" onclick="toSearchAll()">显示所有</button>

                <br><br>

                日期:<input type="date" name="starttime" id="stime">
                <input type="date" name="endtime" id="etime">
                <button type="button" onclick="toChoose()">筛选</button>

                <br><br>

                <table border="1" rules=rows  cellspacing="10" cellpadding="10" valign="center" >
                    <tr>
                        <th align="center"><input type="checkbox"></th>
                        <th align="center">数据集ID</th>
                        <th align="center">数据集名称</th>
                        <th align="center">上传时间</th>
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
                        <td align="center"><%=alist.getId()%></td>
                        <td align="center"><%=alist.getName()%></td>
                        <td align="center"><%=alist.getDatetime()%></td>
                        <td align="center">测试集</td>
                        <td align="center">负样本</td>
                        <td align="center">180</td>
                        <td align="center"><p onclick="toRun(this)" >查看</p>&nbsp
                            <a href="">编辑</a>&nbsp
                            <a href="/dsdelete?id=<%=alist.getId()%>">删除</a></td>
                    </tr>
                    <%
                            }
                        }
                    %>
                </table>

                <!-- 弹窗内容开始 -->
                <div id="background" class="back" style="display: none">
                    <div id="myModal" class="modal">
                        <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
                        <%if(check.checkName(request,"imgPath")==true) {
                            if(session.getAttribute("imgPath")!=""){

                        %>
                        <script type="text/javascript">
                            document.getElementById("background").style.display="block";
                        </script>
                        <img class="modal-content" id="img01" src="../img/<%=session.getAttribute("imgPath")%>">
                    </div>
                    <link rel="stylesheet" href="../css/popstyle.css"/>
                    <script>
                        var modal = document.getElementById('myModal');
                        modal.style.display = "block";
                        var span = document.getElementsByClassName("close")[0];
                        span.onclick = function () {
                            modal.style.display = "none";
                        }
                    </script>
                    <%
                                session.setAttribute("imgPath","");
                            }
                    }%>
                </div>
            </div>
        </div>
    </div>
</div>

</body>

</html>