function reConnect(){

    var xmlhttp=new XMLHttpRequest();

    var url="reConnect";

    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    alert(xmlhttp.responseText);
}