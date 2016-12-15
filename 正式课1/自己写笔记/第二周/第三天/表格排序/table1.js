var tableRox=document.getElementById("table");
var table = tableRox.getElementsByTagName("table")[0];
var tHead=table.tHead;
var tHeadRow =tHead.rows[0];
var tBody = table.tBodies[0];
var tBodyTry=tBody.rows;

(function joSn(){
    var fly = new XMLHttpRequest();
    fly.open("get","date.txt",false);
    fly.onreadystatechange=function(){
        if(fly.readyState == 4 && fly.status == 200){
            window.tata= utils.jsonParse(fly.responseText)
        }
    };
    fly.send(null)
})();
console.log(tata);

(function(){
    var fly = document.createDocumentFragment();
    for(var i=0;i<tata.length;i++){
        var surSor=tata[i];
        var tr = document.createElement("tr");
        for (var key in surSor){
            var td = document.createElement("td");
            td.innerHTML=surSor[key];
            tr.appendChild(td);
        }
        fly.appendChild(tr);
    }
    tBody.appendChild(fly);
})();

function cellColor(){
    for(var i= 0;i<tBodyTry.length;i++){
        tBodyTry[i].className= i % 2 ?"c1":"c0"
    }
}
cellColor();






