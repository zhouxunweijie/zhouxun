var div1 = document.getElementById("div1");
new Banner(div1,"./date/date",2000);
(function(){
    var ul = div1.getElementsByTagName("ul")[0];
    var lis = ul.getElementsByTagName("li");
    for(var i = 0;i<lis.length;i++){
        lis[i].innerText = 1+i;
    }
})();//给轮播图添加数字
(function(){
    var bannerInner =utils.getElesByClass("bannerInner",div1)[0];
    var div2 = bannerInner.getElementsByTagName("div");
    for(var i = 0;i<div2.length;i++){
        var sep = div2[i].index = i;
        if(sep == 0){
            div2[i].style.backgroundColor = "#fd191a";
        }else if(sep == 1){
            div2[i].style.backgroundColor = "#bd1429";
        }
        else if(sep == 2){
            div2[i].style.backgroundColor = "#f91320";
        }
        else if(sep == 3){
            div2[i].style.backgroundColor = "#4b067b";
        }
        else if(sep ==4){
            div2[i].style.backgroundColor = "#d20901";
        }
        else if(sep == 5){
            div2[i].style.backgroundColor = "#00cdff";
        }
    }
})();//给轮播图添加背景颜色
(function(){
    var div4 = document.getElementById("div4");
    var ul = div4.getElementsByTagName("ul")[0];
    var lis = ul.getElementsByTagName("li");
    var divs = div4.getElementsByTagName("div");
    for(var i = 0;i<lis.length;i++){
        if(i == 0){
            lis[i].className = "color2";
            divs[i].style.display = "block";
        }
        (function(i){
            lis[i].onmouseover = function(){
                for(var f = 0;f<divs.length;f++){
                    if(f == i){
                        lis[f].className = "color2";
                        divs[f].style.display = "block";
                    }else{
                        lis[f].className = "";
                        divs[f].style.display = "none";
                    }
                }
            }
        })(i);
    }
})();//轮播图上面的小选项卡
(function(){
    var head5 = document.getElementById("head5");
    var ul1 = head5.getElementsByTagName("ul")[0];
    var left = utils.getElesByClass("left",head5)[0];
    var right = utils.getElesByClass("right",head5)[0];
    (function(){
        var xhr = new XMLHttpRequest();
        xhr.open("get","date/lunbo2?_="+Math.random(),false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                window.data = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
    })();
    (function(){
        if(data){
            var str = '';
            for(var i = 0;i<data.length;i++){
                str += '<li><a href="###"><img src="'+data[i].src+'"/></a></li>';
            }
            str += '<li><a href="###"><img src="'+data[0].src+'"/></a></li>';
            str += '<li><a href="###"><img src="'+data[1].src+'"/></a></li>';
            str += '<li><a href="###"><img src="'+data[2].src+'"/></a></li>';
            str += '<li><a href="###"><img src="'+data[3].src+'"/></a></li>';
            ul1.style.width = "4800"+"px";
            ul1.innerHTML = str;
        }
    })();
    var setp = 0;
    left.onclick = function(){
        setp--;
        if(setp == -1){
            setp=2;
           utils.css(ul1,"left",-3600)
        }
        animate(ul1,{left:setp*-1195},500);
        console.log(utils.css(ul1,"left"));
    };
    right.onclick = function(){
        setp++;
        if(setp == 4){
            setp=1;
            utils.css(ul1,"left",0)
        }
        animate(ul1,{left:setp*-1195},500);
        console.log(utils.css(ul1,"left"));
    }
})();//横向的轮播图
(function(){
    var banner = document.getElementById("banner");
    var inner = document.getElementById("inner");
    var banner1 = document.getElementById("banner1");
    var inner1 = document.getElementById("inner1");
    var banner2 = document.getElementById("banner2");
    var inner2 = document.getElementById("inner2");
    var banner3 = document.getElementById("banner3");
    var inner3 = document.getElementById("inner3");
    var banner4 = document.getElementById("banner4");
    var inner4 = document.getElementById("inner4");
    var banner5 = document.getElementById("banner5");
    var inner5 = document.getElementById("inner5");
    var banner6 = document.getElementById("banner6");
    var inner6 = document.getElementById("inner6");
    new Banner1(banner,"./date/xiaolunbo",2000);
    new Banner1(banner1,"./date/xiaolunbo",2000);
    new Banner1(banner2,"./date/xiaolunbo",2000);
    new Banner1(banner3,"./date/xiaolunbo",2000);
    new Banner1(banner4,"./date/xiaolunbo",2000);
    new Banner1(banner5,"./date/xiaolunbo",2000);
    new Banner1(banner6,"./date/xiaolunbo",2000);
    new Floor(inner);
    new Floor(inner1);
    new Floor(inner2);
    new Floor(inner3);
    new Floor(inner4);
    new Floor(inner5);
    new Floor(inner6);
})();//1F小轮播
(function(){
  var list = document.getElementById("list4");
  var list1 = document.getElementById("list6");
    new Banner2(list,"./date/lun");
    new Banner2(list1,"./date/lun1");

})();
(function(){
    var imgs = document.getElementsByTagName("img");
    function cur(){
        for(var i=0,len = imgs.length;i<len;i++){
            imgs[i].style.display = 'none';
            var a = utils.win('offsetHeight')+utils.win('scrollTop');
            var b = utils.css('scrollTop')+imgs[i].offsetHeight;
            if(a<b){
                curImg(imgs[i])
            }
        }
    }
    function curImg(img){
        var Img = img;
        var oImg = new Image();
        oImg.src = img.src;
        oImg.onload = function(){
            "use strict";
            Img.style.display = "block";
        }

    }


}())
//1F选项卡

