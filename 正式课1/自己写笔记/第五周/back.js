function Move(box){
    var span = box.getElementsByTagName("span")[0];
    box.onmouseenter = function(e){
        //当鼠标刚刚悬停在box的那一刻
        var res= direction(this,e);//左：0 ，下：1，右：2，上：3
        switch (res){
            case 0:
                utils.css(span,{left:0,top:150});
                break;
            case 1:
                utils.css(span,{left:-150,top:0});
                break;
            case 2:
                utils.css(span,{left:0,top:-150});
                break;
            case 3:
                utils.css(span,{left:150,top:0});
                break;

        }
        animate(span,{left:0,top:0},800)
    };
    box.onmouseleave = function(e){
        var res= direction(this,e);
        switch (res){
            case 0:
                animate(span,{left:0,top:150},800);
                break;
            case 1:
                animate(span,{left:-150,top:0},800);
                break;
            case 2:
                animate(span,{left:0,top:-150},800);
                break;
            case 3:
                animate(span,{left:150,top:0},800);
                break;
        }
    };
    function direction(box,e) { //这个函数负责返回一个方向,根据y和x的坐标来通过Math.atan2方法返回一个弧度值，然后再把弧度值转化为角度值,然后再把弧度转化为角度，然后再根据角度来判断属于哪个方向
        //弧度 radian 1rad
        // 角度 angle lang
        var x = e.pageX - box.offsetLeft - box.offsetWidth /2;
        var y = box.offsetTop +box.offsetHeight/2 - e.pageY;
        //x和y 就是鼠标悬停在box的那一刻的坐标
        //根据坐标换弧度
        var rad = Math.atan2(x,y);
        var ang = rad*180/Math.PI;
        //角度已经算出来了 这个角度区间值是[180 ,  -180]
        //先累加一个180这样的区间就变成了【0 ，360】
        //然后除以90这样就变成了【0,4】
        //我们先四舍五入取整数
        //最后%4得到的值是1,2,3,4
        return Math.round((ang+180)/90)%4
    }
};