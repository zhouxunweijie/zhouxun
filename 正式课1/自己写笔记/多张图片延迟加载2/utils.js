var utils={
    getElesByClass:function(strClass,context){
        context = context || document;
        if("JSON" in window){
         return    context.getElementsByClassName(strClass);
        }else{
            var nameAry = context.getElementsByTagName("*");
            var classAry = strClass.replace(/^ +| +$/g,"").split(/ +/);
            var ary = [];
            for(var i=0;i<nameAry.length;i++){
                for(var f = 0;f<classAry.length;f++){
                    var reg = new RegExp('(^| +)'+classAry[f]+'( +|$)');
                    if(!reg.test(nameAry[i].className)){
                        break;
                    }
                    if(f == classAry.length-1){
                        ary.push(nameAry[i])
                    }
                }
            }
        }

        return ary;
    },
    listToArray:function(listAry){
        try{
            return Array.prototype.slice.call(listAry);
        }catch(e){
            var ary = [];
            for(var i = 0;i <listAry.length;i++){
                ary.push(listAry[i]);
            }
        }
        return ary;
    },
    jsonParse:function(n){
        return "JSON" in window?JSON.parse(n):eval("("+n+")");
    },
    offset:function(ele){
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while(par){
            if(window.navigator.userAgent.indexOf("MSIE 8")===-1){
                l +=par.clientLeft;
                t +=par.clientTop;
            }
            l += par.offsetLeft;
            t +=par.offsetTop;
            par = par.offsetParent;
        }
        return {left:l,top:t}
    },
    getCss:function(ele,attr){
        var val = null;
        if(window.getComputedStyle){
            val = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr == 'opacity'){
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val)?reg.exec(val)[1]/100:1;
            }
            val = ele.currentStyle[attr];
        }
            var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
            if(reg.test(val)){
                val = parseFloat(val);
            }

        return val;
    },
    win:function(attr,val){
        if(typeof val !="undefined" ){
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return  document.documentElement[attr]||document.body[attr];
    },
    setCss:function(ele,attr,val){
        if(attr == "opacity" ){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+val*100+')';
            return ;
        }
        if(attr == 'float'){
            ele.cssFloat = val;
            ele.styleFloat = val;
            return;
        }

        var reg = /width|height|left|right|bottom|top|(margin|padding)(Left|Top|Right|Bottom)?/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val +="px"
            }
        }
        ele.style[attr] = val;
    },
};