var utils={
    jsonParse:function(n){
    return 'JSON' in window?JSON.parse(n):eval("("+n+")");
    },
    listToArray:function(likeAry){
        try{
            return Array.prototype.slice.call(likeAry)
        }catch(e){
            var ary=[];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i])
            }
        }
        return ary
    }
};
