function Floor(ele){
    this.ele = ele;
    this.floorHead = utils.getElesByClass("floorHead",this.ele)[0];
    this.headList = utils.getElesByClass("headList",this.floorHead)[0];
    this.lis = this.headList.getElementsByTagName("li");
    this.context = utils.getElesByClass("context",this.ele)[0];
    this.mains = utils.getElesByClass("main",this.context);
    this.on();
}
Floor.prototype.fn = function (index){
    for(var i = 0;i<this.lis.length;i++){
        utils.removeClass(this.lis[i],"selected4");
        utils.removeClass(this.lis[i],"on");
        utils.removeClass(this.mains[i],"selected1");
    }
    utils.addClass(this.lis[index],"selected4");
    utils.addClass(this.lis[index],"on");
    utils.addClass(this.mains[index],"selected1");
};
Floor.prototype.on = function() {
    for (var i = 0; i < this.lis.length; i++) {
        if (i == 0) {
            utils.addClass(this.lis[i],"selected4");
            utils.addClass(this.lis[i], "on");
            utils.addClass(this.mains[i], "selected1");
        }
        this.lis[i].index = i;
        var that = this;
        this.lis[i].onmouseover = function () {
            var that1 = this;
            window.setTimeout(function () {
                that.fn(that1.index)
            }, 500)
        };
    }
}
