/**
 * Created by 8 on 2016/11/6.
 */
/*
* 1 把要拖拽的元素添加到实例的私有属性上
* 2 然后把类的原型上的公有方法去操作私有属性
* 3 onmousedown的事件是什么时候榜上的？
*
* */

function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if(!ele["AAA"+type]){
        ele["AAA"+type] = []
        ele.attachEvent(type,function(){
            fn.call(ele);
        })
    }
    var a = ele["AAA"+type];
    for(var i = 0;i< a.length;i++){
        if(a[i] == fn){
            return;
        }
    }
    a.push(fn);
}

function run(e){
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop||document.body.scrollTop) + e.clientY;
    e.preventDefault = function(){e.returnValue = true};
    e.stopPropagation = function(){e.cancelBubble = false};
    var a = this["AAA" + e.type];
    if(a){
        for(var i =0;i< a.length;i++){
            if(typeof a[i] === "function"){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a = ele["AAA" + type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(a[i] === fn){
                a[i] = null;
                break;
            }
        }
    }
}









function Drag(ele){
this.ele = ele;//把要拖拽的dom元素对象添加在实例的私有属性上，在其他的方法中（原型上的方法）如果再想使用这个ele元素，
    this.l =null; //鼠标按下那一刻鼠标距离ele的偏移量
    this.t = null; //只有再按下的那一刻才能够获取
    this.DOWN = FUN
    on(this.ele,"mousedown",this.down)
}

Drag.prototype.down = function(){

}

