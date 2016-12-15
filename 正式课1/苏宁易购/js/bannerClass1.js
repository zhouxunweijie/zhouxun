function Banner1(container,dataUrl,interval){
    //  把所有全局变量存储到实例的私有属性上
    this.container = container; //最外层容器
    this.dataUrl = dataUrl;
    this.interval = interval || 2000;
    this.bannerInner = utils.getElesByClass('bannerInner',this.container)[0];
    this.focusList = utils.children(this.container,'span')[0];
    this.left = utils.getElesByClass('left',this.container)[0];
    this.right = utils.getElesByClass('right',this.container)[0];
    this.imgs = this.bannerInner.getElementsByTagName('img');
    this.lis = this.focusList.getElementsByTagName('a');
    this.timer = null; //这会没有定时器，要等到公有方法执行才启动定时器
    this.step = 0; // 默认显示第一张
    this.data = null;
    this.init();
    //return this.init(); //在new实例的时刻就要执行这个初始化函数。
}
Banner1.prototype = {
    constructor : Banner1,
    getData : function (){
        var that = this; //这个this是实例
        var xhr = new XMLHttpRequest();
        xhr.open('get',this.dataUrl+'?_='+new Date().getTime(),false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState ==  4 && /^2\d{2}$/.test(xhr.status)){
                that.data = utils.jsonParse(xhr.responseText);
                //这里的this不是实例，必须把数据赋值到实例的私有属性上。
            }
        }
        xhr.send(null);
    },
    bindData : function(){
        if(this.data){
            var str = '';
            var strLi = '';
            for(var i=0;i<this.data.length;i++){
                str +='<li>';
                str +='<a>';
                str+='<p class="title">'+this.data[i].title+'</p>';
                str+='<p class="desc">'+this.data[i].desc+'</p>';
                str +='<span><img src="" realSrc="'+this.data[i].cover+'"></span>';
                //str +='<sapn><img src="" realSrc = "'+this.data[i].img+'"</span>';
                str+='</a>';
                str+='</li>';
                strLi += i === 0 ? '<a class="selected"></a>' :'<a></a>';
            }
            this.bannerInner.innerHTML = str;
            this.focusList.innerHTML = strLi;
        }
    },
    imgLoad : function (){
        var that = this;
        for(var i=0; i<this.imgs.length; i++){
            ;(function (i){
                var curImg = that.imgs[i]; //自运行函数中的this是window
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('realSrc');
                tempImg.onload = function (){
                    curImg.src = this.src;
                    var ary = curImg.parentNode.parentNode;
                    utils.css(ary.parentNode,'display','block');
                    if(i === 0 ){ // 这是第一张
                        utils.css(ary.parentNode,'zIndex',1);
                        animate(ary.parentNode,{opacity:1},500);
                    }
                }
            })(i);
        }
    },
    autoMove : function (){
        this.step++;
        if(this.step == this.data.length){
            this.step = 0;
        }
        this.setImg();
    },
    setImg : function (){
        for(var i=0; i<this.imgs.length; i++){
            var curImg = this.imgs[i];
            var ary = curImg.parentNode.parentNode;
            if(i === this.step){
                utils.css(ary.parentNode,'zIndex',1);
                animate(ary.parentNode,{opacity : 1},300,function (){
                    var siblings = utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        utils.css(siblings[i],'opacity',0);
                    }
                });
            }else{
                utils.css(ary.parentNode,'zIndex',0);
            }
        }
        for(var i=0; i<this.lis.length; i++){
            this.lis[i].className = i === this.step ? 'selected' : '';
        }
    },
    bannerBindEvent : function (){
        var that = this;
        this.container.onmouseover = function (){
            window.clearInterval(that.timer); //事件函数中的this不是实例
            that.left.style.display = that.right.style.display = 'block';
        }
        this.container.onmouseout = function (){
            that.timer = window.setInterval(function (){
                // 定时器中的this是window。所以多嵌套了一个匿名函数。函数函数执行的时候我再执行autoMove;这样autoMove方法中的this就是实例了
                that.autoMove();
            },that.interval);
            that.left.style.display = that.right.style.display  = 'none';
        }
    },
    focusBindEvent : function (){
        var that = this;
        for(var i=0; i<this.lis.length; i++){
            var curLi = this.lis[i];
            curLi.index = i;
            curLi.onclick = function (){
                that.step  = this.index;
                that.setImg();
            }
        }
    },
    buttonBindEvent : function (){
        var that = this;
        this.left.onclick = function (){
            that.step--;
            if(that.step == -1){
                that.step = that.data.length-1;
            }
            that.setImg();
        }
        this.right.onclick = function (){
            // 处理方式和定时器雷同。都是当this冲突的时候那么就用一个匿名函数来替代
            that.autoMove();
        };
    },
    init : function (){
        // 初始化函数: 这个方法负责把所有的函数按照顺序执行。这个方法执行结束轮播图就该实现了
        var that = this;
        this.getData();
        this.bindData();
        this.imgLoad();
        this.timer = window.setInterval(function (){
            that.autoMove();
        },this.interval);
        this.bannerBindEvent();
        this.focusBindEvent();
        this.buttonBindEvent();
        //return this;
    }
};

