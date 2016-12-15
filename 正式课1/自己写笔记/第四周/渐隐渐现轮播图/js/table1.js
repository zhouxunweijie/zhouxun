var banner = utils.getElesByClass("banner")[0];
var bannerInner = utils.getElesByClass("bannerInner",banner)[0];
var focusList = utils.children(banner,"ul")[0];
var left = utils.getElesByClass("left")[0];
var right = utils.getElesByClass("right")[0];
var imgs = bannerInner.getElementsByTagName("img");
var lis = focusList.getElementsByTagName("li");

(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","date.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();

(function(){
    if(data){
        var str = "";
        var str1 = "";
        for(var i=0;i<data.length;i++){
            str +="<div><img src='' curSrc='"+data[i].src+"'></div>";
            str1+= i===0?"<li class='selected'></li>":"<li></li>"
        }
        bannerInner.innerHTML = str;
        focusList.innerHTML = str1;
    }
})();

(function(){
    for(var i=0;i<imgs.length;i++){
        (function(i){
            var tempImg=new Image();
            tempImg.src=imgs[i].getAttribute('curSrc');
            tempImg.onload=function(){
                if(i==0){
                    utils.css(imgs[i].parentNode,'zIndex',1);
                    animate(imgs[i].parentNode,{opacity:1},300)
                }
                imgs[i].src=this.src;
                utils.css(imgs[i],'display','block');
            }
        })(i);
    }
})();







