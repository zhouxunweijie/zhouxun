utils = {
    jsonParse: function (n) {
        return "JSON" in window ? JSON.parse(n) : eval("(" + n + ")");
    },//去掉引号
    listToArray: function (listAry) {
        try {
            return Array.prototype.slice.call(listAry);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < listAry.length; i++) {
                ary.push(listAry[i]);
            }
        }
        return ary;
    },//将类数组转化为数组
    renDom: function (n, m) {
        var n = Number(n);
        var m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        ;
        if (n > m) {
            var temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    },//获取n到m之间的随机小数
    offset: function (ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (window.navigator.userAgent.indexOf("MSIE 8") === -1) {
                l += par.clientLeft;
                t += par.clientTop
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    },//求出到body的偏移量；
    win: function (attr, val) {
        if (typeof val !== "undefined") {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];

    },//设置浏览器窗口的大小和查看浏览器窗口的大小
    getCss: function (ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr = 'opacity') {
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            val = ele.currentStyle[attr];
            var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
            if (reg.test(val)) {
                val = parseFloat(val);
            }
        }
        return val
    },//查看一个属性的值，有单位就去掉，没单位不加，opacity,
    setCss: function (ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.filter = "alpha(opacity=" + val * 100 + ")";
            return;
        }
        if (attr == 'float') {
            ele.cssFloat = val;
            ele.styleFloat = val;
            return;
        }
        var reg = /width|height|top|left|right|bottom|(margin|padding)(Left|Right|Top|Bottom)/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val = val + "px";
            }
        }
        ele.style[attr] = val;
    },
    getElesByClass: function (string, context) {
        context = context || document;
        if (getComputedStyle) {
            return context.getElementsByTagName(string);
        } else {
            var curAry = context.getElementsByTagName("*");
            var reg = string.replace(/^ +| +$/g, "").split(/ +/);
            var ary = [];
            for (var i = 0; i < curAry.length; i++) {
                var cur = curAry[i];
                for (var f = 0; f < reg.length; f++) {
                    var reb = new RegExp("(^| +)" + reg[f] + "( +|$)");
                    if (!reb.rest(cur.className)) {
                        break;
                    }
                    if (f === reg.length - 1) {
                        ary.push(cur);
                    }
                }
            }
            return ary;
        }
    },
    children: function (ele, tagName) {
        var ary = [];
    if(ele.children){
        ary=utils.listToArray(ele.children);
    }else{
        var str = ele.childNodes;
        for(var i = 0;i<str.length;i++){
            if(str[i].nodeType === 1 ){
                ary.push(str[i]);
            }
        }
    }
        if(tagName == "string"){
            for(var f = 0;f <ary.length;f++){
                if(ary[f].nodeName() !== tagName.toUpperCase){
                    ary = ary.splice(f,1);
                    i--;
                }
            }
        }
        return ary;
    },//获取所有子元素
    prev: function (ele) {
        if(ele.previousElementSibling){
            return ele.previousElementSibling
        }
        var par = ele.previousSibling;
        while(par){
            if(par && par.nodeType != 1){
                par = par.previousSibling;
            }
        }
        return par
    },//获取上一个哥哥节点
    next:function(ele){
        if(ele.nextElementSibling){
            return ele.nextElementSibling;
        }
        var ary = ele.nextSibling;
        for(var i = 0;i<ary.length;i++){
            while(ary && ary.nodeType != 1){
                ary = ary.nextSibling;
            }
        }
        return ary;
    }
}