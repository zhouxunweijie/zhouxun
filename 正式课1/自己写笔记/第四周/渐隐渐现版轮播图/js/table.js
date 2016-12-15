
var div1 = utils.getElesByClass("div1")[0];
var div2 = utils.getElesByClass("div2",div1)[0];
var ul1 = utils.getElesByClass("ul1",div1)[0];
var left = utils.getElesByClass("left",div1)[0];
var right = utils.getElesByClass("right",div1)[0];
var imgs = div2.getElementsByTagName("img");
var lis = ul1.getElementsByTagName("li");

(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","date?_="+Math.random(),false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();

(function(){
    if(data){
        var str ='';
        var str1 = '';
        for(var i = 0;i <data.length; i++){
            str +='<div><img src="" curSrc="'+data[i].img+'"/></div>';
            str1 += i===0?'<li class="selected"></li>':'<li></li>';
        }
        div2.innerHTML = str;
        ul1.innerHTML = str1;
    }
})();

(function(){
    for(var i=0;i<imgs.length;i++){
        (function(i){
            var curImg = imgs[i];
            var oImg = new Image();
            oImg.src = curImg.getAttribute("curSrc");
            oImg.onload = function(){
                curImg.src = this.src;
                utils.css(curImg,"display","block");
                if(i == 0){
                    utils.css(curImg.parentNode,"zIndex",1);
                    animate(curImg.parentNode,{opacity:1},500);
                }
            }
        })(i);
    }
})();

var timer = window.setInterval(curImg,2000);
var step = 0;
function curImg(){
    step ++;
    if(step == data.length){
        step = 0;
    }
    dataImg();
}
function dataImg(){
    for(var i = 0; i<imgs.length;i++){
        var par = imgs[i].parentNode;
        if(step == i){
            utils.css(par,"zIndex",1);
            animate(par,{opacity:1},500,function(){
                var val = utils.sibling(this);
                for(var i = 0;i<val.length;i++){
                    utils.css(val[i],"opacity",0);
                }
            })
        }else{
            utils.css(par,"zIndex",0);
        }
    }
    for(var f= 0;f<lis.length;f++){
        lis[f].className = f === step?"selected":"";
    }
}
div1.onmouseover = function(){
    window.clearInterval(timer);
    left.style.display = right.style.display = "block";
};
div1.onmouseout = function(){
    timer = window.setInterval(curImg,2000);
    left.style.display = right.style.display = "none";
};

left.onclick = function(){
    step--;
    if(step == -1){
        step = data.length -1;
    }
    dataImg();
};
right.onclick = curImg;
(function(){
    for(var i =0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onclick = function(){
            step = this.index;
            dataImg();
        }
    }
})();


