
var utils={
    children:function(ele,tagName){
        var ary= [];
        if(window.getComputedStyle){
            ary = utils.listToArray(ele.children);
        }else{
            var nodeList = ele.childNodes;
            for(var i = 0;i<nodeList.length;i++){
                if(nodeList[i].nodeType === 1 ){
                    ary.push(nodeList[i]);
                }
            }
        }
        if(typeof tagName =="string"){
            for(var i = 0;i <ary.length;i++){
                if(ary[i].nodeName !==tagName.toUpperCase()){
                }
            }
        }
    },//获取所有的子元素
}