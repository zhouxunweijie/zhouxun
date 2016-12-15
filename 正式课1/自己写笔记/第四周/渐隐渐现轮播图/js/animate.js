(function(){
    function animate(ele,target,turation,callback){
        var interval = 10;
        var time = 0;
        var change = {};
        var begin = {};
         var linear = function(t,b,c,d){
             return b+t/d*c
         };
        if(ele.timer){
            window.clearInterval(ele.timer);
        }
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        ele.timer = window.setInterval(function(){
    time +=interval;
    if(time>turation){
        window.clearInterval(ele.timer);
        utils.css(ele,target);
        if(typeof callback == "function"){
            callback.call(ele);
        }
        return ;
    }
    for(var key in change){
        if(change[key]){
            var val = linear(time,begin[key],change[key],turation);
            utils.css(ele,key,val);
        }
    }
},interval)
}
window.animate = animate;
})();