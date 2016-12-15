var ul1 =document.getElementById("ul1");
var imgs = ul1.getElementsByTagName("img");

(function(){
    var fly = new XMLHttpRequest();
    fly.open("get","date.txt",false);
    fly.onreadystatechange = function(){
        if(fly.readyState == 4 && fly.status == 200){
            window.data = utils.jsonParse(fly.responseText)
        }
    }
    fly.send(null);
})();

(function(){
    if(window.data){
        var str = '';
        for(var i=0;i<data.length;i++){
            var curData = data[i];
            str +='<li>';
            str +='<div><img src="" curSrc="'+curData.img+'"></div>';
            str +='<div><h2>'+curData.title+'</h2><p>'+curData.desc+'</p></div>';
            str +='</li>';
        }
    }
    ul1.innerHTML = str;
})();

function curImg(img){
    if(img.isloaded){return;}
    var Img = new Image();
    Img.src = img.getAttribute('curSrc');
    Img.onload = function(){
        img.src = this.src;
        utils.setCss(img,'display','block');
        fedeIn(img);
    }
    img.isloaded = true;
}
function fedeIn(img){
    var imgData  = utils.getCss(img,'opacity');
    img.timer = window.setInterval(function(){
        if(imgData >=1){
            window.clearInterval(img.timer);
            utils.setCss(img,'opacity',1);
        }
       imgData +=0.01;
        utils.setCss(img,'opacity',imgData)
    },10)
}

function cllImg(){
    var imgsAry = utils.listToArray(imgs);
    for(var i=0;i<imgsAry.length;i++){
        var curAty = imgsAry[i];
        var a = utils.win('clientHeight')+utils.win("scrollTop");
        var b = curAty.parentNode.offsetHeight + utils.offset(curAty.parentNode).top;
        if(a > b){
            curImg(curAty);
        }
    }
}
window.onscroll=cllImg;
window.setTimeout(cllImg,500);




