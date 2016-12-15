/**
           * Created by 8 on 2016/10/26.
           */
          /*
           * 先获取所有用的着的标签
           *
           * */

          var banner = utils.getElesByClass("banner")[0];//最外层的banner
          var bannerInner = utils.getElesByClass("bannerInner",banner)[0];//包含着四张图片的盒子
          var imgs = bannerInner.getElementsByTagName("img");//获取所有的图片
          var focusList = utils.children(banner,"ul")[0];//获取焦点的列表
          var lis = focusList.getElementsByTagName("li");
          var left = utils.getElesByClass("left",banner)[0];
          var right = utils.getElesByClass("right",banner)[0];

          (function getData(){
              var xhr = new XMLHttpRequest();
              //在data,txt后面拼接一个随机数是为了不读取本地304缓存，保证每次请求的数据都不一样
              xhr.open("get","date.txt?_="+Math.random(),false);//timeStamp
              xhr.onreadystatechange = function(){
                  if(xhr.readyState == 4 && xhr.status == 200){
                      window.data = utils.jsonParse(xhr.responseText);
                  }
              }
              xhr.send(null);
          })();
          console.log(data);

          (function(){
              if(data){
                  var str = '';
                  var str1 = '';
                  for(var i=0;i<data.length;i++){
                      str +='<div><img src="" curSrc="'+data[i].src+'" ></div>' ;
                      str1 += i == 0?'<li class="selected"></li>':'<li></li>';
                  }
              }
              str +='<div><img src="" curSrc="'+data[0].src+'" ></div>' ;
              //在末尾增加一张图片，为了图片在轮播的时候保证无缝连接的
              bannerInner.innerHTML= str;
              focusList.innerHTML = str1;
              utils.css(bannerInner,'width',1000*(data.length+1));
              //由于多加了一张图，但是bannerInner不够宽，所以需要重新设置宽度。这个宽度其实就是和获取回来的数据。length+1;
          })();
//

//图片延迟加载（图片有效性验证） ==》其实就是src这个属性的值一定要去加载一个有效值

          (function(){
              for(var i=0;i<imgs.length;i++){
                  var curImg = imgs[i];
                  //这些图片的src的值都在cursrc的属性上，验证之后将cursrc属性转移到src上
                  var tempImg = document.createElement("img");
                  tempImg.src = curImg.getAttribute("curSrc");
                  tempImg.index=i;
                  tempImg.onload = function(){
                      imgs[this.index].src = this.src;
          utils.css(imgs[this.index],"display","block");
          animate(imgs[this.index],{opacity:1},500);
      }
  }
})();

//轮播图开始

var timer = window.setInterval(autoMove,2000);//这个定时器负责多久更换一次图片
var step = 0;
function autoMove(){
    if(step == data.length){
        step = 0;
        utils.css(bannerInner,"left",0)
    }
    step ++;//0=>1  那么step++之后的值就是我下次运动的终点
    animate(bannerInner,{left:step*-1000},500);//500ms必须要小于timer这个定时器的时间间隔
    focusAlign();//每次轮播之后都要执行一次焦点跟随距离
}

function focusAlign(){//让焦点和轮播图对应
    var tempStep = step == lis.length? 0 : step;
    for(var i=0;i<lis.length;i++){
        lis[i].className = i === tempStep ? 'selected' : "";
    }
}
banner.onmouseover = function(){
    window.clearInterval(timer);
    utils.css(left,"display","block");
    utils.css(right,"display","block");
};
banner.onmouseout = function(){
    timer = window.setInterval(autoMove,2000);
    //鼠标离开继续启动这个定时器开始轮播，必须要给timer重新赋值，否则下次没法清除定时器了
};
right.onclick = function(){
    autoMove()
};
left.onclick = function(){
    if(step == 0){
        step = data.length;
        utils.css(bannerInner,"left",step*-1000);
    }
    step--;
    animate(bannerInner,{left:step*-1000},500);
    focusAlign();
};
//给焦点圈绑定点击事件，点击切换图片
(function(){
    for(var i=0;i<lis.length;i++){//每个焦点框都需要绑定
        var curLi = lis[i];
        curLi.index = i;//给每一个li添加一个自定义属性保存索引，当点击的时候通过this来获取这个索引，并且step的值就是这个索引

        curLi.onclick = function(){
            if(step==data.length) {//如果点击的那一刻的step是最后一张（看起来是最后一张），那么先把整个bannerInner移动到left为零的位置
                step=0;
                utils.css(bannerInner,"left",0);
            }
            //点击发生
            step = this.index;//保证下次轮播从当前点击的这个位置开始

            animate(bannerInner,{left:step*-1000},500);
            focusAlign();
        }
    }
})();







