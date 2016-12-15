~function(pro){
    function queryURLParameter(){
        var obj = {},//声明一个变量用来储存匹配到的值
            reg = /([^?&=#])=([^#&=?])/g;
        //如果等号两边的字符不是这些符号那么就把他们获取到
        this.replace(reg,function(){//用正则将匹配到的数值替换出来
            obj[arguments[1]] = arguments[2];//将匹配到的第一项作为属性名，第二项作为属性值
        });

        reg = /#([^#&?=]+)/;//只要是#号后面不是这些符号就可以匹配
        if(reg.test(this)){
            obj['HASH'] = reg.exec(this)[1];//将捕获到的数值存到obj的对象里
        }
        return obj;
    }
    //往这个函数里传一个模板，将获取到的事件改变为相应的样式
    function formatTime(temoplate){
        temoplate = temoplate || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var ary = this.match(/\d+/g);
        temoplate = temoplate.replace(/\{(\d+)\}/g,function(){//讲ary里面的数值替换到temoplate里面的中括号里
            var index = arguments[1],//在这里将模板里的数值获取到
                result = ary[index];//将模板里的数值作为索引将ary里面的数值拿出来
            result = result || '00;';
            result.length <2 ?result = '0'+result : null;
            return result;//每一次正则匹配到的数值都会经过上面的代码到这里输出，每一次只输出一个
        });
        return temoplate
    }

    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);


var navRander = (function(){
    "use strict";
    var $menu = $('#menu'),
        $nav = $('#nav');
    return {
        init:function(){
            $menu.tap(function(){
                if($nav.attr('isBlock')==='true'){
                    $nav.css({
                        padding:0,
                        height:0
                    }).attr('isBlock',false);
                    return;
                }
                $nav.css({
                    padding:'.1rem 0',
                    height:'2.22rem'
                }).attr('isBlock',true);
            })
        }
    }
})
navRander.init();

var matchRender = (function(){
    var $matchTemplate = $('#matchTemplate'),
        $match = $('#match');
    function bindHTML(matchInfo){
        var template = $matchTemplate.html();
        var res =ejs.render(template,{matchInfo:matchInfo});
        $match.html(res);
        bindSupport();
    }
    function bindSupport(){
        var $support = $match.find('.support'),
            $supportLeft = $support.eq(0),
            $supportRight = $support.eq(1),
            $progress = $match.find('.progress');
        var isTouch = false,
            supportInfo = localStorage.getItem(('support'));
        if(supportInfo){
            supportInfo = JSON.parse(supportInfo);
            supportInfo.type == 1? $supportLeft.addClass('bg'):$supportRight.addClass('bg');
        }
        var oldNum = parseFloat($(this).html());
        $(this).addClass('bg').html(oldNum + 1);

        var leftNum = parseFloat($supportLeft.html()),
            rightNum = parseFloat($supportRight.html());
        $progress.css('width',(leftNum/leftNum + rightNum) * 100 + '%');

        var type = $(this).attr('data-type');
        $.ajax({
            url:'http://matchweb.sports.qq.com/kbs/teamSupport?mid=100000:1469151&type='+type,
            type:'get',
            dataType:'jsonp'
        })
    }

    localStorage.setItem('support',JSON.stringify({
        type:type,
        isTouch:true
    }));
    return {
        init:function(){
            $.ajax({
                url:'http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1469151',
                type:'get',
                dataType:'jsonp',
                success:function(result){
                    if(result && result[0] == 0){
                        result = result[1];
                        var matchInfo = result['matchInfo'];
                        matchInfo.leftSupport = result['leftSupport'];
                        matchInfo.rightSupport = result['rightSupport'];
                        bindHTML(matchInfo);
                    }

                }
            })
        }
    }
});
matchRender.init();

var playerRender = (function(){
    function bindHTML(playerList){
        var $player = $('#player'),
            $playerItem = $player.children('ul'),
            $playerTemplate = $('playerTemplate');
        function bindHTML(){
            $playerItem.html(ejs.render($playerTemplate.html(),{playerList:playerList})).css('width',playerList.length * 2.4+0.3+'rem');
            new IScroll('#player',{scrollX:true});
        }

    }
    return {
        init:function(){
            $.ajax({
                url:'http://matchweb.sports.qq.com/html/matchStatV37?mid=100000:1469151',
                type:'get',
                datatype:'jsonp',
                success:function(result){
                if(result && result[0]==0){
                    result = result[1]['stats'];
                    $.each(result,function(index,item){
                        if(item.type == 9){
                            result = item.list;
                            return false;
                        }
                    });
                    bindHTML();
                }
            }
            })
        }
    }
})















