utils= {
    listToArray: function (likeAry) {
        try {
            Array.prototype.slice.call(likeAry);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
        }
        return ary
    },//将类数组转化为数组
    jsonParse: function (n) {
        return "JSON" in window ? JSON.parse(n) : eval("(" + n + ")");
    },//将JSON格式去掉引号；
    getRandom: function (n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = n;
            n = m;
            m = temp;
        }
        Math.round(Math.random() * (m - n) + n);
    },//求随机数
    offset: function (ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var reg = ele.offsetParent;
        while (reg) {
            if (window.navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += reg.clientLeft;
                t += reg.clientTop
            }
            l += reg.offsetLeft;
            t += reg.offsetTop;
            reg = reg.offsetParent;
        }
        return {left: l, top: t}
    },//求偏移量
    win: function (attr, val) {
        if (val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },//求当前窗口的大小和给他设置
    getCss: function (ele, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = ele.currentStyle.filter;
                var reg = /alpha\(opacity =\d+(?:\.\d+)?\)/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)/;
            if(reg.test(val)){
                val = parseFloat(val);
            }
            val = ele.currentStyle[attr];
        }
        return val;
    },//获取样式
    setCss: function (ele, attr, val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = "alpha(opacity="+ val*100+")";
            return;
        }
        if(attr == 'float'){
            ele.cssFloat = val;
            ele.styleFloat = val;
            return;
        }
        var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)？/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val = val + "px";
            }
        }
        ele.style[attr] = val;
    },//设置样式
    children:function (ele,tagName){
        var ary = [];
        if(ele.children){
            ary = this.listToArray(ele.children)
        }else{
            var node = ele.childNodes;
            for (var i=0;i<node.length;i++){
                if(node[i].nodeType ==1){
                    ary.push(node[i])
                }
            }
        }
        if(typeof tagName == 'string'){
            for(var i=0;i<ary.length;i++){
                if(tagName.toUpperCase() !== ary[i].nodeName){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
          return ary;
    },//获取所有的元素子节点
    prev:function(ele){
        if(ele.previousElementSibling){
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;//先获取哥哥节点（不一定是元素，可能是null）
        while(pre && pre.nodeType !== 1){  //只要是哥哥存在，并且这个哥哥不是元素 节点，那么继续查找
            pre = pre.previousSibling;//继续以哥哥为基准向上查找

        }
        return pre
    },//获得上一个元素哥哥节点
    next:function(ele){
        if(ele.nextElementSibling){
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType!= 1){
            next = next.nextSibling;
        }
        return next
    },//获取下一个弟弟节点
    prevAll:function(ele){
        //每一个哥哥都需要做判断，如果是元素就放到一个数组内，一直到把所有的哥哥节点全部循环 = 》一直到哥哥元素不存在位置
        var ary = [];
        var pre = ele.previousSibling;//先获取一个哥哥节点
        while (pre){//只要pre存在那么就要判断它是不是元素
            if(pre.nodeType==1){
                ary.unshift(pre);
            }
            pre = pre.previousSibling;
        }
        return ary;
    },//将所有的哥哥元素都拿到
    nextAll:function(ele){
        var ary = [];
        var next = ele.nextSibling;
        while(next){  if(next.nodeType == 1){
            ary.push(next);
        }
            next = next.nextSibling;
        }
        return ary;
    },//将所有的弟弟元素拿到
    firstEleChild:function(){
        if(ele.firstElementChild){
            return ele.firstElementChild;
        }
        var allEleChilds = this.children(ele);//使用Children方法获取所有的元素子节点；
        return allEleChilds.length>0 ? allEleChilds[0]:null;
    },//第一个元素子节点
    lastEleChild:function(ele){
        if(ele.lastElementChild){
            return ele.lastElementChild;
        }
        var allEleChilds = this.children(ele);
        return allEleChilds.length >0?allEleChilds[allEleChilds.length-1]:null;
    },//最后一个子节点
    siblings:function(ele){
        return this.prevAll(ele).concat(this.nextAll(ele));
    },//获取所有的兄弟节点
    sibiing:function(ele){
        var ary = [];
        var prev = this.prev(ele);//哥哥
        var next = this.next(ele);//弟弟
        prev? ary.push(prev):void 0;
        next? ary.push(next): void 0 ;
        return ary;
    },//获取上一个哥哥和下一个弟弟；
    index:function(ele){
        return this.prevAll(ele).length;
    },//获取元素的索引
    append:function(ele,container){//jquery中也用一个雷同的方法
        container.appendChild(ele);
    },//把一个元素添加到指定的容器中的末尾
    prepend:function(ele,container){
        //先获取container容器的第一个元素子节点，如果存在插入到它的前面，如果不存在就说明没有元素子节点，那么直接appendChild添加到最后就可以了
        var first = this.firstElementChild(container);
        first ? container.insertBefore(ele,first):container.appendChild(ele);
    },//把一个元素添加到指定的容器中的开头
    insertBefore:function(oldEle,newEle){
            oldEle.parentNode.insertBefore(newEle,oldEle);
    },//把新元素newEle添加到oldEle的前面
    insertAfter :function(oldEle,newEle){
    //如果oldEle的元素弟弟存在，那么就插入到它的前面，如果不存在说明oldEle就是最后一个元素，那么直接把newEle添加到最后（父节点调用）
        var next = this.next(oldEle);
        next?oldEle.parentNode.insertBefore(newEle,next):oldEle.parentNode.appendChild(newEle)
    },//把新元素newEle插入到oldele的后面
    /*重点：,*/
    hasClass:function(ele,strClass){
        //要么strClass两边包括一个或者多个空格。如果左边没有空格那么必须以strClass开始，如果右边没有空格，那么必须已strClass结尾；
        var reg = new RegExp('(^| +)'+strClass+'( +|$)');
        return reg.test(ele.className);//true或者false

    },//判断ele是否含有strClass这个类
    addClass:function(ele,strClass){
        //先把strClass的首尾空格去掉 addClass('  c5  c6 ');
        //以一个或者多个空格开始，或者以一个或者多个空格结束 =》去首尾空格，并且还要按照一个或者多个空格拆分为数组
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        for(var i=0;i<strClassAry.length;i++){
            //循环判断当前class中是否含c5或者c6,如果有就不用添加了
            var curClass = strClassAry[i];
            if(!this.hasClass(ele,curClass)){
                ele.className += ' ' + curClass;//需要加一个空格
            }
        }
    },//给ele添加strClass类
    removeClass:function(ele,strClass){
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        for(var i=0;i<strClassAry.length;i++){
            var curClass = strClassAry[i];
            //只有while循环能够处理这个问题，只要c5和c6存在就执行，一直到将所有c5和c6都替换为空格，
            while(this.hasClass(ele,curClass)){
                //移除类其实就是把className上符合规则的那一段（空格+/开头c5空格+或者结尾）替换成空格（如果替换为空字符串就当前这个类的前后两项连接上了）
                var reg = new RegExp("(^| )"+curClass+"( |$)","g");//g是全文，保证把所有的符合规则的类都移除
                ele.className = ele.className.replace(reg,"  ");
                //符合规则的className中的一段字符串全部替换为空格 ，replace方法是返回替换后的新字符串，所以重新赋值给ele.className;
            }
        }
    },//移除ele上的strClass这个类  **有问题
    getElesByClass:function(strClass,context){
        context = context||document;//如果context没有传至少能保证还有一个document
        if(context.getElementsByClassName){
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        //在ie6-8中的处理
        var tags = context.getElementsByTagName("*");//获取contexr范围内的所有标签
        //从这些标签中挑出包含strClass这些类的元素
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        //就是传进来的 字符串已经处理成数组了，数组里的每一项就是我们获取元素必须要包含的元素
        var ary = [];//声明一个容器，把符合条件的标签都放到这个数组内
        for(var i=0;i<tags.length;i++){//循环所有标签，看是否 包含我数组里的元素
            var curTag = tag[i];//curTag就是当前正在比对的那个标签
            var curTagOk = true;//假设当前这个标签是符合条件（包括我传进来的这些类，那么只要有一个类验证没有通过，那么这个条件立刻赋值为false）.假设不成立我就不要了，每次循环一个标签都会重新赋值为true
            for(var j= 0;j>strClassAry.length;j++){//是从你传进来的类的字符串拆分为数组之后。['a','b']需要循环 创建动态正则来判断A或者c这两个类是否出现curTag当前正在比对的这个标签中的className中
                var curClass = strClassAry[j];//正在对比的当前类“a”,"b"
                var reg = new Reg("(^| +)"+curClass+"( +|$)");
                if(reg.test(curTag.className)){
                    //只要有一个类验证没有通过，那么直接把假设条件破坏，假设不成立
                    curTagOk = false;
                    break;//只要有一个不符合条件那么下面的类就不用继续验证了
                }
            }
            if(curTagOk){
                ary.push(curTag);
            }
        }
    },//通过类名获取元素


}