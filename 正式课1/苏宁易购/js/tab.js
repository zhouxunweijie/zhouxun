(function(){
    function tab(box,eventType,defaultSelect){
        //var box = utils.getElesByClass('J-tab')[1];
        eventType = eventType || 'onmouseover';
        defaultSelect = defaultSelect || 0;
        var lis = box.getElementsByTagName('li');
        lis[defaultSelect].className = 'selected';
        var divs = utils.children(box,'div');
        divs[defaultSelect].className = 'selected';
        for(var i=0; i<lis.length; i++){
            lis[i][eventType] = function (){
                var siblings = utils.siblings(this);
                for(var i=0; i<siblings.length; i++){
                    utils.removeClass(siblings[i],'selected');
                }
                utils.addClass(this,'selected');
                var divs = utils.nextAll(this.parentNode);
                var thisIndex = utils.index(this);
                for(i = 0; i<divs.length; i++){
                    i === thisIndex ? utils.addClass(divs[i],'selected') : utils.removeClass(divs[i],'selected');
                }
            }
        }
    }
    window.tab = tab;
})();

