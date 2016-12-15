/*
简单升级一下on 和off 还有run 等方法

* /
 */
/**
 * Created by lucky on 2016/11/6.
 */
function on(ele,type,fn){
    //如果是自定义事件那么就不用下面我们以前处理原生系统事件的代码了
    //只要是self开头的我们以后就认为是自定义事件
    if(/^self/.test(type)){
        if(!ele[type]){
            ele[type] = []
        }
    var a = ele[type];
    for(var i =0;i< a.length;i++){
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
    return;

    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    }
    if(!ele['AAA'+type]){
        ele['AAA'+type] = [];
        ele.attachEvent('on'+type,function (){  run.call(ele/*,window.event*/); })
    }
    var a = ele['AAA'+type];
    for(var i=0; i<a.length; i++){
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
}
function run(e){
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft||document.bodyk.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop||document.body.scrollTop) + e.clientY;
    e.preventDefault = function (){  e.returnValue = false;  }
    e.stopPropagation = function () { e.cancelBubble = true; }
    // ele['AAA'+type]
    var a = this['AAA' + e.type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(typeof a[i] === 'function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    if(/^self/.test(type)){
        var a = ele[type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(a[i]===fn){
                    a[i] = null;
                    break;
                }
            }
        }
        return;
    }
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a = ele['AAA'+type];
    if(a){
        for(var i=0; i<a.length; i++){
            if(a[i] === fn){
                a[i] = null;
                break;
            }
        }
    }
}
function selfRun(type,e){
    var a = this[type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(typeof a[i] === "function"){
                a[i]();
            }
        }
    }
}