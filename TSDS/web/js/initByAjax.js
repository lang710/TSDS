//toUpdate  更新远程数据库配置
//toInit    初始化本地数据库数据
//toDelete  删除本地数据库数据
//toDelay   更新远程数据获取频率
//toCamp    更新Camp信息
//toRun     运行系统

function toUpdate(){
    var ip=document.getElementById("ip").value;
    var port=document.getElementById("port").value;
    var dbname=document.getElementById("dbname").value;
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var inittime=document.getElementById("inittime").value;

    var xmlhttp=new XMLHttpRequest();

    var url="updateDBConfig?ip="+ip+"&port="+port+"&dbname="+dbname+"&username="+username+"&password="+password+"&inittime="+inittime;

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}

function toCamp(){

    var xmlhttp=new XMLHttpRequest();

    var url="updateCampTable";

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}

function toDelete(){

    var deletetime=document.getElementById("deletetime").value;
    var xmlhttp=new XMLHttpRequest();

    var url="deleteClick?deletetime="+deletetime;

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}

function toInit(){
    //alert("get");
    var inittime=document.getElementById("inittime").value;
    alert(inittime);

    var xmlhttp=new XMLHttpRequest();

    var url="initDB?inittime="+inittime;
    alert("开始初始化!");

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}

function toDelay(){
    var table1=document.getElementById("delaytable1");
    var table2=document.getElementById("delaytable2");
    var table3=document.getElementById("delaytable3");
    var table4=document.getElementById("delaytable4");

    var delayArray="",rows,i;

    rows=table1.rows;
    for(i=1;i<rows.length;i++){
        delayArray+=rows.cells[1].innerText+"|";
    }
    rows=table2.rows;
    for(i=1;i<rows.length;i++){
        delayArray+=rows.cells[1].innerText+"|";
    }
    rows=table3.rows;
    for(i=1;i<rows.length;i++){
        delayArray+=rows.cells[1].innerText+"|";
    }
    rows=table4.rows;
    for(i=1;i<rows.length;i++){
        if(i<rows.length-1)
            delayArray+=rows.cells[1].innerText+"|";
        else
            delayArray+=rows.cells[1].innerText;
    }

    var xmlhttp=new XMLHttpRequest();

    var url="delayUpdate?delayArray="+delayArray;

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}

function toRun() {

    var runOrPause = document.getElementById("runSystem").innerText;
    if (runOrPause == "运行系统") {
        var xmlhttp = new XMLHttpRequest();
        var url = "runSystem?toRun=true";
        alert("开始运行!");
        document.getElementById("runSystem").innerText="暂停运行";

        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        //alert(xmlhttp.responseText);
    }else{
        var xmlhttp=new XMLHttpRequest();
        var url="runSystem?toRun=false";
        alert("已经暂停!");
        document.getElementById("runSystem").innerText="开始运行";

        xmlhttp.open("GET",url,false);
        xmlhttp.send();
    }
}