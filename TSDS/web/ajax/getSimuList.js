function syncgetSimuList(){
    var xmlhttp=new XMLHttpRequest();

    xmlhttp.open("GET","ajaxtxt",false);
    xmlhttp.send();
    document.getElementById('mysync').innerText=xmlhttp.responseText;
    asyncgetSimuList();
}

function asyncgetSimuList(){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            document.getElementById('myasync').innerText=xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET","ajaxtxt",true);
    xmlhttp.send();
}
