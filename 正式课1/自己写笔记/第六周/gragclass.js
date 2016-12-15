/*
* 如果不想做任何处理，记住如果想操作绑定selfdragseZindex
* */


function Emitter(){}
    Emitter.prototype.on = function(type,fn){
        if(!this[type]){
            this[type]  = [];
        }
        var a = this[type];
        for(var i=0;i< a.length;i++){
            if(a[i] === fn){
                return;
            }
        }
        a.push(fn);
        return this
};
    Emitter.prototype.off = function(type,fn){
        var a = this[type];
        if(a){
            for(var i =0;i< a.length;i++){
                if(a[i] === fn){
                    a[i] = null;
                    break;
                }
            }
        }
    };
    Emitter.prototype.run = function(type,e){
        var a = this[type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(typeof a[i] == 'function'){
                    a[i].call(this,e);
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    };

Drag.prototype = new Emitter();
Drag.prototype.constructor = Drag;

function Drag(ele){
    this.ele = ele;
    this.l = null;
    this.t = null;
    var that = this;
    this.DOWN = function(e){
        that.down(e)
    };
    this.MOVE = function(e){
        that.move(e)
    }
    this.UP = function(e){
        that.up(e)
    }
    on(this.ele,"mousedown".this.DOWN);
}

Drag.prototype.down = function(e){
    this.l = e.pageX - this.ele.offsetLeft;
    this.t = e.pageY  - this.ele.offsetTop;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    //我准备拖拽了 => 广播通知 => 哪些函数绑定过这个事件那么就可能在这个时刻执行了
    this.run('selfdragstart',e);
}
Drag.prototype.move = function(e){
    var l = e.pageX - this.l;
    var t = e.pageY - this.t;
    var minL = 0,minT =0;
    var maxL  = (document.documentElement.clientLeft || document.body.clientLeft) - this.ele.offsetWidth;
    var maxT = (document.documentElement.clientTop || document.body.clientTop ) - this.ele.offsetHeight;
    l = l<minL ? minL:l>maxL?maxL:l;
    t = t<minT ? minT:t >maxT?maxT:t;
    this.ele.style.left = l + 'px';
    this.ele.style.top = t + 'px';
    e.preventDefault();
    //move方法在执行的时候，那一定是在拖拽过程中，不管是谁订阅了拖拽的事件，都会在这个时候触发
    this.run('selfdraging',e);
}
Drag.prototype.up = function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    //最后这一步虽然容易忘记，但是这一行代码才是真正的让拖拽和其他在拖拽和其他在拖拽中的
    this.run('selfdragend',e);
}