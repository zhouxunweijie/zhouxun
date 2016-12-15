//在IE6-8中绑定函数会进行重复绑定函数，事件执行的时候中的this是window，而且处理的顺序是不规则的
//所以我们要将IE678中的这些事解决掉
function on(ele,type,fn){ //负责绑定事件
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    //给ele身上添加一个自定义属性数组，并且将同一个事件类型的放在一个数组里，方便我们进行按顺序执行
    if(!ele["AAA" +type]){ //判断ele身上是不是有这个自定义，如果没有就添加一个
        ele["AAA" +type] = [];
        //在IE678中绑定事件用attachEvent属性，前面必须要加上“on”,因为 需要修改run方法中的this，所以要将run放在一个匿名函数中执行，并且将run中的this修改为现在的ele，
        ele.attachEvent("on" + type,function(){ //
            run.call(ele);//run的方法就是为了让自定义数组里面的函数按照顺序执行，将run里面的this修改为ele；
        });
   }
    var a = ele["AAA" + type];
    for(var i = 0;i< a.length;i++){ //这个循环是为了将重复绑定的函数进行去重
        if(a[i] === fn){
            return;//如果存在那么就不用执行了
        }
    }
    a.push(fn);//把绑定在事件上的函数添加到对应的数组里
}

function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if(!ele["AAA"+type]){
        ele["AAA"+type] = [];
        ele.attachEvent("on"+type,function(){
            run.call(ele);
        })
    }
}



