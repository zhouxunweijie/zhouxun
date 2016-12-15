/**
 *  处理DOM鼠标滚动事件的兼容性问题
 */
;(function (){
    function addWheelEventListener(ele,handler){
        if(window.navigator.userAgent.indexOf('Firefox')!==-1){
            ele.addEventListener('DOMMouseScroll',fn);
        }else{
            ele.onmousewheel = fn;
        }
        function fn(e){
            e = e||window.event;
            var isDown = null;
            if(e.wheelDelta){
                isDown = e.wheelDelta<0;
            }else if(e.detail){
                isDown = e.detail>0;
            }
            if(typeof handler === 'function'){
                handler.call(ele,isDown,e);
            }
            // 如果向下或者向上滚动要执行的代码是从这里开始，从这个位置就开始区分向下滚动要做什么向上滚动要做什么
            //if(isDown){
            //    // 这个位置需要你向下的时候要执行的函数
            //}else{
            //    // 向上的时候要做的函数
            //}
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }
    }
    // 函数内部的私有变量在外边还想用，利用回调函数的方式
    window.addWheelEventListener = addWheelEventListener;

})();



