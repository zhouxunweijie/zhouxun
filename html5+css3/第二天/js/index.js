(function(){
    "use strict";
    var banner = document.getElementById("banner");
    var bannerInner = utils.getElesByClass('bannerInner',banner)[0];
    var list1 = utils.getElesByClass("list1",banner)[0];
    var list2 = utils.getElesByClass("list2",banner)[0];
    var ul = banner.getElementsByTagName("ul")[0];
    var lis = ul.getElementsByTagName('li');
    var left = utils.getElesByClass("left",banner)[0];
    var right = utils.getElesByClass("right",banner)[0];

    var step = 0;
    var timer = window.setInterval(dataImg,3000);
    function dataImg(){
        step++;
        if(step==2){
            step=0;
        }
        curImg(step);
    }

    function curImg(step){
        if(step ==0){
            list1.style.display = "block";
            animate(list1,{opacity:1},300,function(){
                list2.style.display = "none";
                utils.css(list2,{opacity:0});
            });
        }else if(step == 1){
            list2.style.display = "block";
            animate(list2,{opacity:1},300,function(){
                list1.style.display = "none";
                utils.css(list1,{opacity:0});
            });
        }
        for(var i=0;i<lis.length;i++){
            lis[i].index = i;
            lis[i].className = i===step?"selected":"";
        }
    }
        right.onclick = function(){
            window.clearInterval(timer);
            dataImg()
        };
        left.onclick = function(){
            window.clearInterval(timer);
            step--;
            if(step==-1){
                step=1;
            }
            curImg(step);
        };

    banner.onmouseover = function(){
        window.clearInterval(timer);
    };
    banner.onmouseout = function(){
        timer = window.setInterval(dataImg,3000);
    }

}())
