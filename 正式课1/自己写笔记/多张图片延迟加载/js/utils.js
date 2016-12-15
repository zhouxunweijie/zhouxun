var utils ={
    listToArray:function(likeAry){
        try{
            return Array.prototype.slice.call(likeAry);
        }catch(e){
            var ary = [];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i])
            }
        }
        return ary;
    },//将类数组转化为数组
    jsonParse:function(n){
        return "JSON" in window?JSON.parse(n):eval("("+n+")");
    },//去引号
    win:function(attr,val){
        if(typeof val != "undefined"){
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr]||document.body[attr]
    },//获取可视窗口的大小和设置
    random:function(n,m){
        n= Number(n);
        m= Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            var temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random()*(m-n)+n)
    },//求随机数
    offset:function(ele){
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t +=ele.offsetTop;
        var par = ele.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf("MSIE 8")===-1){
                l += par.clientLeft;
                t +=par.clientTop;
            }
            l +=par.offsetLeft;
            t +=par.offsetTop;
            par = par.offsetParent
        }
        return {left:l,top:t}
    },//求偏移量
    getCss:function(ele,attr){
        var val = null;
        if(window.getComputedStyle){
           val = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr == 'opacity'){
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val)? reg.exec(val)[1]/100:1;
            }
            val = ele.currentStyle[attr];
        }
        var reg = /-?\d+(\.\d+)?(px|pt|em|tem|deg)?/;
        if(reg.test(val)){
            val = parseFloat(val);
        }
        return val;
    },//获取属性值
    setCss:function(ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter ='alpha(opacity='+val*100+')';
            return;
        }
        if(attr == 'float'){
            ele.cssFloat = val;
            ele.styleFloat = val;
            return;
        }

        var reg = /width|height|top|left|right|bottom|(margin|padding)(Top|Bottom|Left|Right)?/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val = val+"px";
            }
        }
        ele.style[attr] = val;
    }//设置属性值

};

