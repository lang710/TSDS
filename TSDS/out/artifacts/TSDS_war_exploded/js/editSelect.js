function getSelectOption(selectorid){
    var obj = document.getElementById(selectorid); //定位id
    var index = obj.selectedIndex; // 选中索引
    var value = obj.options[index].value; // 选中值
    return value;
}


function deviceClick(){
    var device=localStorage.getItem('device');
    if(device!='-1') {
        var campTable=document.getElementById("campTable");
        var rows=campTable.rows;
        //alert(selector_device);
        for (var i = 1; i < rows.length - 1; i++) {
            //alert(rows[i].cells[4].innerText);
            if (rows[i].cells[4].innerText[0].toLowerCase()!= device[0].toLowerCase()) {
                //alert(rows[i].cells[4].innerText);
                rows[i].style.display = "none";
            }
        }
    }
}

function countryClick(){
    var country=localStorage.getItem('country');
    if(country!='-1') {
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        for (var i = 1; i < rows.length - 1; i++) {
            if (rows[i].cells[5].innerText != country)
                rows[i].style.display = "none";
        }
    }
}


function networkClick(){
    var network=localStorage.getItem('network');
    if(network!='-1') {
        var campTable = document.getElementById("campTable");
        var rows = campTable.rows;
        for (var i = 1; i < rows.length - 1; i++) {
            if (rows[i].cells[2].innerText != network)
                rows[i].style.display = "none";
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

function refreshSelector(){

    var device=getSelectOption('deviceFilter');
    var country=getSelectOption('countryFilter');
    var network=getSelectOption('networkFilter');

    localStorage.setItem('device',device);
    localStorage.setItem('country',country);
    localStorage.setItem('network',network);

    refreshFilter();
}

function refreshFilter(){

    showAllRow();
    deviceClick();
    countryClick();
    networkClick();

}


function showTest(obj){
    var result=getSyncDayTest(obj);
    var results=result.split(",");
    var device=obj.cells[4].innerText+'-'+results[0];
    var country=obj.cells[5].innerText+'-'+results[1];
    obj.cells[4].innerText=device;
    obj.cells[5].innerText=country;
}

function getSyncDayTest(obj){
    //alert("get");
    var campid=obj.cells[0].innerText;
    var xmlhttp=new XMLHttpRequest();
    var count=document.getElementById("clickCount").value;
    if(count==null)
        count="1000";

    var url="testClickList?campid="+campid+"&count="+count;
    alert("Testing!");

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    //alert(xmlhttp.responseText);
    return xmlhttp.responseText;
}


