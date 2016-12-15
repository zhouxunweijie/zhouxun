
var banner = utils.getElesByClass("banner")[0];
var bannerInner = utils.getElesByClass("bannerInner",banner)[0];
var focusList = utils.children(banner,"ul")[0];
var left = utils.getElesByClass("left",banner)[0];
var right = utils.getElesByClass("right",banner)[0];
var imgs = bannerInner.getElementsByTagName("img");
var lis = focusList.getElementsByTagName("li");

//获取数据
(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","date.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(1);
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();


//用字符串创建标签，将创建的标签添加到HTML里

(function(){
    if(data){
        var str = "";
        var str1 = "";
        for(var i=0;i<data.length;i++){
            str+= "<div><img src='' curSrc='"+data[i].src+"'></div>";
            str1 += i===0?"<li class='selected'></li>":"<li></li>";
        }
        bannerInner.innerHTML = str;
        focusList.innerHTML = str1;
    }
})();

//循环所有的图片，创建新的标签用来检测图片能否加载成功，如果加载成功将第一张图片默认显示在网页上，将所有图片设置为显示状态
(function imgData(){
    for(var i=0;i<imgs.length;i++){
        (function(i){
        var curImg = imgs[i];
            var tempImg = new Image();
            tempImg.src = curImg.getAttribute("curSrc");
            tempImg.onload = function(){
                if(i===0){//这是第一张
                    animate(curImg.parentNode,{opacity:1},500);
                    utils.css(curImg.parentNode,"zIndex","1")
                }
                curImg.src = this.src;
                utils.css(curImg,"display","block");
            }
        })(i);
    }
})();

//自动轮播
//设置一个全局变量，用来代表图片显示第几张图片；设置一个定时器执行函数
var timer = window.setInterval(autoMove,2000);
var step = 0;
function autoMove(){//将全局变量++;执行负责改变图片状态的函数
    step ++;
    if(step == data.length){//step++之后的值就是我下一次要显示是=的
        step=0;
    }
    console.log(step)
    setImg();
}
autoMove();
//这个函数负责将图片循环，判断当前图片等于显示的图片，那么将他的层级改成1；将他的透明度撤职为动画效果，并将其他的图片的透明度设置为0；最后将li绑定图片，使图片和li同步显示

function setImg(){//负责让和step的值相等的那一张图片的层级为1，其他的图片的层级全部设置为0；
    for(var i=0;i<imgs.length;i++){
        var curImg =imgs[i];

        if(i===step){
            utils.css(curImg.parentNode,"zIndex",1);
            //当层级已经提高了之后，让透明度立刻从0运动到1
            animate(curImg.parentNode,{opacity:1},300,function(){
                var siblings = utils.sibling(this);//除了当前运动元素的其他兄弟元素节点（）
                for(var i=0;i<siblings.length;i++){
                    utils.css(siblings[i],"opacity",0);
                }
            });
        }else{

            utils.css(curImg.parentNode,"zIndex",0)
        }
    }
for(var i=0;i<lis.length;i++){
        lis[i].className = i===step?"selected":"";
    }
}
banner.onmouseover = function(){
    window.clearInterval(timer);
left.style.display = right.style.display = "block";
};
banner.onmouseout = function(){
    timer = window.setInterval(autoMove,2000);
    left.style.display = right.style.display = "none";
};
(function(){
    for(var i=0;i<lis.length;i++){
        var curLi = lis[i];
        curLi.index = i;
        curLi.onclick= function(){
            step = this.index;
            setImg();
        }
    }
})();

left.onclick = function(){
    step--;
    if(step == -1){
        step = data.length;
    }
    setImg();
};
right.onclick = function(){
    autoMove();
};












