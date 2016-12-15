(function(){
    function animate(ele,target,duration,callback){
        var time = 0;
        var begin = {};
        var change = {};
        var linear = function(t,b,c,d){
            return t/d*c+b;
        };
        if(ele.timer){
            window.clearInterval(ele.timer);
        }
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        ele.timer = window.setInterval(function(){
            time += 10;
            if(time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback =="function"){
                    callback.call(ele);
                }
                return;
            }
            for(var key in change){
                if(change[key]){
                    var val = linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },10);
    }
    window.animate = animate;
})();