

function getInvalidClick(campid){
    alert("get");
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200) {
            alert(xmlhttp.responseText);
            return xmlhttp.responseText;
        }
    };
    var day=document.getElementById("stime").value;
    var zone=getSelectOptionP2("zoneFilter");
    var url="dayClickList?day="+day+"&zone="+zone+"&campid="+campid;

    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function getSyncDayClick(campid){
    //alert("get");
    var xmlhttp=new XMLHttpRequest();
    var day=document.getElementById("stime").value;
    var zone=getSelectOptionP2("zoneFilter");
    var url="dayClickList?day="+day+"&zone="+zone+"&campid="+campid;
    //alert(url);

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    //alert(xmlhttp.responseText);
    return xmlhttp.responseText;
}

/*直接在前端统计当天该campid的数据,使用Ajax统计无效点击的数据*/
function getlist(campid,campname){
    //alert("list");
    //
    var sclick=getSyncDayClick(campid);
    var timeinvalidclick=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var timelead=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var sclicklist=sclick.split(",");
    var sinvalid=sclicklist[0];
    var svalid=sclicklist[1];
    //alert(sclicklist);
    //alert(sinvalid);
    //alert(svalid);

    //alert(sinvalid);
    var sinvalidlist=sinvalid.split("|");
    var svalidlist=svalid.split("|");
    //alert(sinvalidlist);

    for(var ti=0;ti<sinvalidlist.length;ti++)
        timeinvalidclick[ti]=parseInt(sinvalidlist[ti]);

    for(var tj=0;tj<svalidlist.length;tj++)
        timelead[tj]=parseInt(svalidlist[tj]);

    /*
    var timelead=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


    var campTable=document.getElementById("campTable");
    var rows=campTable.rows;
    for(var i=1;i<rows.length-1;i++){
        //alert(rows[i].style.display);
        //if(rows[i].style.display!="none"){
            //alert(rows[i].cells[2].innerText);
        if(rows[i].cells[2].innerText==campid) {
            var alltime=rows[i].cells[9].innerText;
            //alert(alltime.substring(11,13));
            var time = parseInt(alltime.substring(11, 13));
            timelead[time]++;
            //alert(time);
        }
        //}
    }
    */
    //alert(timelead);
    var poptitle1="camp_id:"+campid;
    var poptitle2="camp_name:"+campname;
    var table1="<tr><th>hour</th><th>leads</th><th>total</th><th>cvr</th></tr>";
    var table2="<tr><th>hour</th><th>leads</th><th>total</th><th>cvr</th></tr>";
    var table3="<tr><th>hour</th><th>leads</th><th>total</th><th>cvr</th></tr>";
    var table4="<tr><th>hour</th><th>leads</th><th>total</th><th>cvr</th></tr>";
    for(var l=0;l<6;l++) {
        var cvr=0.0;
        if(timelead[l] + timeinvalidclick[l]!=0)
            cvr=100 * timelead[l] / (timelead[l] + timeinvalidclick[l]);
        table1 += "<tr><td>" + l.toString() + "</td><td>" + timelead[l].toString() + "</td><td>" + (timelead[l] + timeinvalidclick[l]).toString() + "</td><td>" + cvr.toFixed(3) + "</td></tr>";
    }
    for(var l=6;l<12;l++) {
        var cvr=0.0;
        if(timelead[l] + timeinvalidclick[l]!=0)
            cvr=100 * timelead[l] / (timelead[l] + timeinvalidclick[l]);
        table2 += "<tr><td>" + l.toString() + "</td><td>" + timelead[l].toString() + "</td><td>" + (timelead[l] + timeinvalidclick[l]).toString() + "</td><td>" + cvr.toFixed(3) + "</td></tr>";
    }
    for(var l=12;l<18;l++) {
        var cvr=0.0;
        if(timelead[l] + timeinvalidclick[l]!=0)
            cvr=100 * timelead[l] / (timelead[l] + timeinvalidclick[l]);
        table3 += "<tr><td>" + l.toString() + "</td><td>" + timelead[l].toString() + "</td><td>" + (timelead[l] + timeinvalidclick[l]).toString() + "</td><td>" + cvr.toFixed(3) + "</td></tr>";
    }
    for(var l=18;l<24;l++) {
        var cvr=0.0;
        if(timelead[l] + timeinvalidclick[l]!=0)
            cvr=100 * timelead[l] / (timelead[l] + timeinvalidclick[l]);
        table4 += "<tr><td>" + l.toString() + "</td><td>" + timelead[l].toString() + "</td><td>" + (timelead[l] + timeinvalidclick[l]).toString() + "</td><td>" + cvr.toFixed(3) + "</td></tr>";
    }

    document.getElementById("poptitle1").innerText=poptitle1;
    document.getElementById("poptitle2").innerText=poptitle2;

    document.getElementById("poptable1").innerHTML=table1;
    document.getElementById("poptable2").innerHTML=table2;
    document.getElementById("poptable3").innerHTML=table3;
    document.getElementById("poptable4").innerHTML=table4;
    document.getElementById("background").style.display="block";
}

function showdaylist(obj){
    //alert("click");
    var dateby=getSelectOptionP2("datebyFilter");
    //alert(dateby);
    if (dateby == '*'){
        var selector_stime=document.getElementById("stime").value;
        var selector_etime=document.getElementById("etime").value;
        //alert(selector_stime);
        //alert(selector_etime);
        //alert(selector_stime);
        if(selector_stime!="") {
            if (selector_stime == selector_etime) {
                //alert("yes");
                var campid = obj.cells[0].innerText;
                var campname = obj.cells[1].innerText;
                //alert(campid);
                getlist(campid, campname);
            }
        }
    }
}

function getSelectOptionP2(selectorid){
    var obj = document.getElementById(selectorid); //定位id
    var index = obj.selectedIndex; // 选中索引
    var value = obj.options[index].value; // 选中值
    return value;
}

window.onclick = function close(e) {
    div=document.getElementById('background');
    if (e.target == div) {
        div.style.display = "none";
    }
};


function closeTable(){
    document.getElementById("background").style.display="none";
}



