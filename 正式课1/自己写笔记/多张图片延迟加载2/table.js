var ul = utils.getElesByClass("ul")[0];
var imgs = ul.getElementsByTagName("img");


(function(){
    var fly = new XMLHttpRequest;
    fly.open("get","date.txt",false);
    fly.onreadystatechange = function(){
        if(fly.readyState == 4 && fly.status == 200){
            window.data = utils.jsonParse(fly.responseText);
        }
    };
    fly.send(null);
})();
console.log(data);

(function(){
    if(window.data){
        var str = '';
        for(var i = 0;i<data.length;i++){
            str +='<li>';
            str +='<div><img src="" curSrc="'+data[i].img+'"></div>';
            str +='<div><h2>'+data[i].title+'</h2><p>'+data[i].desc+'</p></div>';
            str +='</li>';
        }
        ul.innerHTML = str;
    }
})();

function dataImg(img){
    if(img.isload){return;}
    var oImg = new Image();
    oImg.src = img.getAttribute("curSrc");
    oImg.onload = function(){
        img.src = this.src;
        utils.setCss(img,"display","block");
        fedeIn(img);
    };
    img.isload = true;
}
function fedeIn(img){
    img.timer = window.setInterval(function(){
        var opacity = utils.getCss(img,"opacity");
        if(opacity>=1){
            window.clearInterval(img.timer);
            utils.setCss(img,"opacity",1);
            return;
        }
        opacity +=0.01;
        utils.setCss(img,"opacity",opacity);
    },10);
}
function callIng(){
    var imgAry = utils.listToArray(imgs);
    for(var i=0;i<imgAry.length;i++){
        var a = utils.win("clientHeight")+utils.win("scrollTop");
        var b = imgAry[i].parentNode.offsetHeight+utils.offset(imgAry[i].parentNode).top;
        if(a > b){
            dataImg(imgAry[i]);
        }
    }
}
callIng();
window.onscroll = callIng;