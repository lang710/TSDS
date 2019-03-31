/*折叠或者显示时间段*/
function showTime(){
    var dateby=getSelectOption("datebyFilter");
    if (dateby == '*')
        document.getElementById("customTime").style.display = "block";
    else
        document.getElementById("customTime").style.display="none";
}

/*刷新campaigns表单，通过隐藏表单提交按钮实现*/
function toRresh(){
    refreshSelector();
    document.getElementById("submitCompaigns").click();
}

function hideme(obj){

    var id=obj.getAttribute("id");
    document.getElementById(id).style.display="none";
    var selector_status=getSelectOption('statusFilter');
    var index=parseInt(obj.cells[0].innerText);         //获取id

    /*var index=obj.rowIndex;*/
    var campStatus=localStorage.getItem('campStatus');
    if(selector_status=='1')
        campStatus=campStatus.substring(0,2*(index-1))+'1'+campStatus.substring(2*(index-1)+1,campStatus.length);
    else
        campStatus=campStatus.substring(0,2*(index-1))+'0'+campStatus.substring(2*(index-1)+1,campStatus.length);
    //alert(read);
    localStorage.setItem('campStatus',campStatus);

    refreshFilter();

}

function initStatus(){
    var campStatus=[];
    var campTable=document.getElementById("campTable");
    var rows = campTable.rows;
    for(var i=0;i<rows.length-2;i++)
        campStatus.push(1);             //初始化为每一行都显示
    localStorage.setItem('campStatus',campStatus);
}

function initSelector(){
    localStorage.setItem('selector_dateby','-1');
    localStorage.setItem('selector_zone','8');
    localStorage.setItem('selector_status','-1');
    localStorage.setItem('selector_device','-1');
    localStorage.setItem('selector_country','-1');
    localStorage.setItem('selector_server','-1');
    localStorage.setItem('selector_network','-1');
}

function refreshSelector(){
    var selector_stime=document.getElementById("stime").value;
    var selector_etime=document.getElementById("etime").value;

    var selector_dateby=getSelectOption('datebyFilter');
    var selector_zone=getSelectOption('zoneFilter');
    var selector_status=getSelectOption('statusFilter');
    var selector_device=getSelectOption('deviceFilter');
    var selector_country=getSelectOption('countryFilter');
    var selector_server=getSelectOption('serverFilter');
    var selector_network=getSelectOption('networkFilter');

    localStorage.setItem('selector_stime',selector_stime);
    localStorage.setItem('selector_etime',selector_etime);

    localStorage.setItem('selector_dateby',selector_dateby);
    localStorage.setItem('selector_zone',selector_zone);
    localStorage.setItem('selector_status',selector_status);
    localStorage.setItem('selector_device',selector_device);
    localStorage.setItem('selector_country',selector_country);
    localStorage.setItem('selector_server',selector_server);
    localStorage.setItem('selector_network',selector_network);

    refreshFilter();
}

function recoverySelector(){
    var selector_dateby=localStorage.getItem("selector_dateby");
    var selector_zone=localStorage.getItem("selector_zone");
    var selector_status=localStorage.getItem("selector_status");
    var selector_device=localStorage.getItem("selector_device");
    var selector_country=localStorage.getItem("selector_country");
    var selector_server=localStorage.getItem("selector_server");
    var selector_network=localStorage.getItem("selector_network");

    var selector_stime=localStorage.getItem("selector_stime");
    var selector_etime=localStorage.getItem("selector_etime");

    setSelectedOption("datebyFilter",selector_dateby);
    setSelectedOption("zoneFilter",selector_zone);
    setSelectedOption("statusFilter",selector_status);
    setSelectedOption("deviceFilter",selector_device);
    setSelectedOption("countryFilter",selector_country);
    setSelectedOption("serverFilter",selector_server);
    setSelectedOption("networkFilter",selector_network);

    document.getElementById("stime").value=selector_stime;
    document.getElementById("etime").value=selector_etime;
}

function deviceClick(){
    var selector_device=localStorage.getItem('selector_device');
    if(selector_device!='-1') {
        var campTable=document.getElementById("campTable");
        var rows=campTable.rows;
        //alert(selector_device);
        for (var i = 1; i < rows.length - 1; i++) {
            //alert(rows[i].cells[4].innerText);
            if (rows[i].cells[4].innerText[0].toLowerCase() != selector_device[0].toLowerCase()) {
                //alert(rows[i].cells[4].innerText);
                rows[i].style.display = "none";
            }
        }
    }
}

function countryClick(){
    var selector_country=localStorage.getItem('selector_country');
    if(selector_country!='-1') {
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        for (var i = 1; i < rows.length - 1; i++) {
            if (rows[i].cells[5].innerText != selector_country)
                rows[i].style.display = "none";
        }
    }
}

function serverClick(){
    var selector_server=localStorage.getItem('selector_server');
    if(selector_server!='-1') {
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        //alert(selector_server);
        for (var i = 1; i < rows.length - 1; i++) {
            //alert(rows[i].cells[3].innerText);
            if (rows[i].cells[3].innerText != selector_server)
                rows[i].style.display = "none";
        }
    }
}

function networkClick(){
    var network_server=localStorage.getItem('selector_network');
    if(network_server!='-1') {
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        for (var i = 1; i < rows.length - 1; i++) {
            if (rows[i].cells[2].innerText != network_server)
                rows[i].style.display = "none";
        }
    }
}

function showValid(){
    var ifpage2 = document.getElementById("page2");
    if (ifpage2 == null) {
        var obj = document.getElementById("showvalid");
        if (obj.value == "1") {
            var campTable = document.getElementById("campTable");
            var rows = campTable.rows;
            for (var i = 1; i < rows.length - 1; i++) {
                if (rows[i].cells[6].innerText == "0")
                    rows[i].style.display = "none";
            }
        }
    }
}

function setButton(){
    var obj=document.getElementById("showvalid");
    //alert(obj.value);
    if(obj.value=="0"){
        obj.setAttribute("value","1");
    }else{
        obj.setAttribute("value","0");
    }
    refreshFilter();
}

function refreshFilter(){
    showTime();
    statusClick();
    deviceClick();
    countryClick();
    serverClick();
    networkClick();
    showValid();
    //alert("1");
    separatepage();
    //alert("2");
    showpage();
    refreshlastrow();
}



function refreshlastrow(){
    //alert("lastrow");
    var obj = document.getElementById("page2");
    if (obj == null) {
        //alert("page1");
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        var clicks = 0;
        var leads = 0;
        var amount = 0.0;
        for (var i = 1; i < rows.length - 1; i++) {
            //alert(rows[i].style.display);
            if (rows[i].style.display != "none") {
                //alert(rows[i].cells[6].innerText);
                //alert(parseInt(rows[i].cells[6].innerText));
                clicks += parseInt(rows[i].cells[6].innerText);
                //alert(clicks);
                leads += parseInt(rows[i].cells[7].innerText);
                amount += parseFloat(rows[i].cells[10].innerText);
            }
        }
        var cvr = 0.0;
        if (clicks > 0)
            cvr = 100 * leads / clicks;
        rows[rows.length - 1].cells[6].innerText = clicks.toString();
        rows[rows.length - 1].cells[7].innerText = leads.toString();
        rows[rows.length - 1].cells[10].innerText = amount.toFixed(3);
        rows[rows.length - 1].cells[8].innerText = cvr.toFixed(3);
    }
}


function pageselect(){
    statusClick();
    deviceClick();
    countryClick();
    serverClick();
    networkClick();
    showpage();
}


function separatepage() {

    var obj = document.getElementById("page2");
    if (obj != null){
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        var valid=0;
        var limit = 50;
        var page = 1;
        for(var i=1;i<rows.length-1;i++){
            if(rows[i].style.display!="none")
                valid++;
        }
        if (valid % limit == 0) {
            page = parseInt(valid / limit);
        } else {
            page = parseInt(valid / limit) + 1;
        }

        obj.options.length=0;
        //alert("page"+page);
        for (var i = 1; i <= page; i++) {
            obj.options.add(new Option(i.toString(), i.toString()));
        }
        //setSelectedOption("page2","1");
        //return page;
    }
}

function showpage(){
    var obj = document.getElementById("page2");
    if (obj != null) {
        var page = parseInt(getSelectOption("pageSelector"));
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        var start = 50 * (page - 1);
        var end = 50 * page;
        //alert(rows.length);
        //alert(start);
        //alert(end);
        var j = 0;
        for (var i = 1; i < rows.length - 1; i++) {
            //alert(rows[i].style.display);
            if (rows[i].style.display != "none") {
                //alert(j);
                if (j >= start && j < end)
                    j++;
                else {
                    rows[i].style.display = "none";
                    j++;
                }
            }
        }
    }
}

function showAllRow(){

    var campTable=document.getElementById("campTable");
    var rows=campTable.rows;
    for(var i=1;i<rows.length-1;i++){
        rows[i].style.display="";
    }
}

function showActiveRow(){
    var campStatus=localStorage.getItem('campStatus');
    var campTable=document.getElementById("campTable");
    var rows=campTable.rows;

    for(var i=1;i<rows.length-1;i++){
        var id=parseInt(rows[i].cells[0].innerText);
        if(campStatus[2*(id-1)]=='1')
            rows[i].style.display="";
        else
            rows[i].style.display="none";
    }

    /*
    for(var i=1;i<rows.length-1;i++){
        if(campStatus[2*(i-1)]=='1')
            rows[i].style.display="";
        else
            rows[i].style.display="none";
    }
    */
}

function showInactiveRow(){
    var campStatus=localStorage.getItem('campStatus');
    var campTable=document.getElementById("campTable");
    var rows=campTable.rows;

    for(var i=1;i<rows.length-1;i++){
        var id=parseInt(rows[i].cells[0].innerText);
        if(campStatus[2*(id-1)]=='0')
            rows[i].style.display="";
        else
            rows[i].style.display="none";
    }

    /*
    for(var i=1;i<rows.length-1;i++){
        if(campStatus[2*(i-1)]=='0')
            rows[i].style.display="";
        else
            rows[i].style.display="none";
    }
    */
}

function statusClick(){
    var selector_status=localStorage.getItem('selector_status');
    //alert(selector_status);
    if(selector_status=='-1')
        showAllRow();
    else if(selector_status=='0')
        showActiveRow();
    else if(selector_status=='1')
        showInactiveRow();
}


function getSelectOption(selectorid){
    var obj = document.getElementById(selectorid); //定位id
    var index = obj.selectedIndex; // 选中索引
    var value = obj.options[index].value; // 选中值
    return value;
}

function setSelectedOption(selectorid,optionvalue){
    var all_options = document.getElementById(selectorid).options;
    for (i=0; i<all_options.length; i++){
        if (all_options[i].value == optionvalue)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
            all_options[i].selected = true;
    }
}


function initParameter(){

    //初始化
    if(localStorage.getItem('selector_dateby')==null){
        initSelector();
    }
    if(localStorage.getItem("campStatus")==null) {
        initStatus();
    }

    recoverySelector();
    refreshFilter();
}



