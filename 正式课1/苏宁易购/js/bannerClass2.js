function Banner2(list,date){
        this.date = date;
        this.list = list;
        this.ul1 = this.list.getElementsByTagName("ul")[0];
        this.left = utils.getElesByClass("left",this.list)[0];
        this.right = utils.getElesByClass("right",this.list)[0];
        this.setp = 0;
    this.data = null;
    this.curImg();
    this.parse();
    this.join();

    }
   Banner2.prototype = {
       constructor:Banner2,
       curImg:function() {
           var that = this;
           var xhr = new XMLHttpRequest();
           xhr.open("get", ""+this.date+"?_=" + Math.random(), false);
           xhr.onreadystatechange = function () {
               if (xhr.readyState == 4 && xhr.status == 200) {
                   that.data = utils.jsonParse(xhr.responseText);
               }
           };
           xhr.send(null);

       },


          parse: function(){
               if(this.data){
                   var str = '';
                   for(var i = 0;i<this.data.length;i++){
                       str += '<li>';
                       str += '<h1><img src="'+this.data[i].img+'"/></h1>';
                       str += '<p>'+this.data[i].table+'</p>';
                       str += '<p>'+this.data[i].pop+'</p>';
                       str +='<s>'+this.data[i].age+'</s>';
                       str += '<span>可省￥<em>'+this.data[i].math+'</em></span>';
                        str +='<div>';
                       str +='<img src="images/btn-1.png"/>';
                       str +='<p>快扫我，手机下单更便宜</p>';
                       str += '</div>';
                       str += '</li>';
                   }
                   this.ul1.style.width = "2372"+"px";
                   this.ul1.innerHTML = str;
               }
           },
            join:function() {
                var that = this;
                that.left.onclick = function(){
                    if(that.setp == 0){
                        that.setp=3;
                        utils.css(that.ul1,"left",-1758)
                    }
                    that.setp--;
                    animate(that.ul1,{left:that.setp*-586},500);
                };
                that.right.onclick = function(){
                    if(that.setp ==3){
                        that.setp=0;
                        utils.css(that.ul1,"left",0)
                    }
                    that.setp++;
                    animate(that.ul1,{left:that.setp*-586},500);
                }
            }

   };
window.Banner2 = Banner2;





















































