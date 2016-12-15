/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var obj = {},
            reg = /([^?&=#]+)=([^?&=#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });

        //->GET HASH
        reg = /#([^?&=#]+)/;
        if (reg.test(this)) {
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }

    function formatTime(template) {
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var ary = this.match(/\d+/g);
        template = template.replace(/\{(\d+)\}/g, function () {
            var index = arguments[1],
                result = ary[index];
            result = result || '00';
            result.length < 2 ? result = '0' + result : null;
            return result;
        });
        return template;
    }

    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);

var groupReader=(function(){
    var $main = $('#main'),
        $ul1 = $('#ul1'),
        $li1 = $ul1.children('li').children('.hide'),
        $none = $ul1.children('.none');
    return {
        init:function(){
            $main.tap(function(){
                if($ul1.attr('isBlock') == 'true'){
                    $ul1.css({
                        display:'block',
                        padding:'5px 0'
                    }).attr('isBlock',false);
                    return;
                }
                $ul1.css({
                    display:'none',
                }).attr('isBlock',true);
            });

            $li1.tap(function(){
               if($none.css('display')=='none'){
                   $li1.addClass('aaa');
                   $none.css({display:'block'});
                   return;
               };
               $li1.removeClass('aaa');
               $none.css({display:'none'});
            })
        }
    }
})();
groupReader.init();
var matchReader = (function(){
    var $matchTemplate = $('#matchTemplate'),
        $match = $('#match');
    function bindHTML(matchInfo){
        var template = $matchTemplate.html();
        var res = ejs.render(template,{matchInfo:matchInfo});
        $match.html(res);
        bindSupport();
    }
    function bindSupport(){
        var $support = $match.find('.support'),
            $supportLeft= $support.eq(0),
            $supportRight= $support.eq(1),
            $progress = $match.find('.progress');
        var isTouch = false,
            supportInfo = localStorage.getItem('support');
        if(supportInfo){
            supportInfo=JSON.parse(supportInfo);
            supportInfo.type === 1? $supportLeft.addClass('bg'):$supportRight.addClass('bg');
            return;
        }
        $support.tap(function(){
            if(isTouch) return;
            isTouch = true;
            var oldNum = parseFloat($(this).html());
            $(this).addClass('bg').html(oldNum + 1);
            var leftNum = parseFloat($supportLeft.html()),
                rightNum = parseFloat($supportRight.html());
            $progress.css('width',(leftNum / ))
        })


    }
    return {
        init:function(){
            $.ajax({
                url:"http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1469151",
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
})();
matchReader.init();