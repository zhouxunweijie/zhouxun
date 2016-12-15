
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
        return ;
    }
    var tempFn = function(){
        fn.call(ele);
    };
    tempFn.origin = fn;
    if(!ele["my"+type]){
        ele["my"+type] = [];
    }
    var a = ele["my"+type];
    if(a){
        for(var i = 0;i< a.length;i++){
            if(a[i].origin == fn){
                return;
            }
        }
    }
    a.push(tempFn);
    ele.attachEvent("on" + type,tempFn);
}

function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn);
        return;
    }
    var a = ele["my" + type];
    if(a){
        for(var i =0;i< a.length;i++){
            var tempFn = a[i];
            if(tempFn.origin == fn){
                ele.detachEvent("on"+type,tempFn);
                a.splice(i,1);
                break;
            }
        }
    }
}