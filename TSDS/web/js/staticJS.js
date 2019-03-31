window.onclick=function close(e){
    var div=document.getElementById('background');
    if(e.target == div){
        div.style.display = "none";
    }
};

function getImg(){
    document.getElementById("background").style.display="block";
}

function getTableByTime(){

    alert("toChoose");
    var stime=document.getElementById("stime").value;
    var etime=document.getElementById("etime").value;
    alert(stime);
    alert(etime);
    window.location.href="/dschoose?stime="+stime+"&etime="+etime;
}

