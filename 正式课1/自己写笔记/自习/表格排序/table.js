
var tableBox=document.getElementById("table");
var  table=tableBox.getElementsByTagName("table")[0];
var  tHead=table.tHead;
var  tHeadRow=tHead.rows[0];
var ths=tHeadRow.cells;
var tBody=table.tBodies[0];
var tBodyRow=tBody.rows;


(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","date.txt",false);
    xhr.onreadystatechange=function(){
     if(xhr.readyState==4&&xhr.status==200){
         window.data=utils.jsonParse(xhr.responseText);
     }

    }
    xhr.send(null);


})();
console.log(window.data);



(function(){
    if(window.data){
       var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
        var data1=data[i];
       var tr=document.createElement("tr");
            for(var key in data1){
                var td=document.createElement("td");
                if(key=="sex"){
                    td.innerHTML=data1[key]==1?'男':"女";
                }else {
                    td.innerHTML=data1[key];
                }
                tr.appendChild(td);
            }
         frg.appendChild(tr);

        }
       tBody.appendChild(frg);
        frg=null;
    }
})();




function ch(){
    for(var i=0;i<tBodyRow.length;i++){

        tBodyRow[i].className=i%2==0?"c0":"c1";
    }
}
ch();

function  sort(n){
    for(var i=0;i<ths.length;i++){
        if(ths[i]!==this){
            ths[i].ab=-1;
        }
    }
    this.ab*=-1;
    console.log(this.ab);
    var that=this;
    var ary=utils.listToArray(tBodyRow);
    ary.sort(function(a,b){
        var _a= a.cells[n].innerHTML;
        var _b= b.cells[n].innerHTML;
        if(isNaN(_a)||isNaN(_b)){
            return (_a.localeCompare(_b))*that.ab;
        }
        return (_a -_b)*that.ab;

    })
    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
}

(function(){
for(var i=0;i<ths.length;i++){
    ths[i].ab=-1;
    ths[i].index=i;
   ths[i].onclick=function(){
       sort.call(this,this.index);
       ch();
   }
}



})();