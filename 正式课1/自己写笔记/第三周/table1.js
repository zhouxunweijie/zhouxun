var ul1 = document.getElementById("newsList");
var imgs = ul1.getElementsByTagName("img");

(function(){
    var fly = new XMLHttpRequest();
    fly.open("get","date.txt",false);
    fly.onreadystatechange = function(){
        if(fly.readyState == 4 && fly.status == 200){
            window.data = utils.jsonParse(fly.responseText);
        }
    };
    fly.send(null);
})();


(function (){
    if(window.data){
        var str = '';
        for(var i=0;i<data.length;i++){
           var sur = data[i];
            str += '<li>';
            str += '<div><img src="" curSrc="'+sur.img+'"></div>';
            str += '<div><h2>'+sur.title+':</h2><p>'+sur.desc+':</p></div>';
            str += '</li>';
        }
    }
    ul1.innerHTML = str;
})()


function cur(img){
    if(img.log){return;}
    var oImg = new Image();
    oImg.src = img.getAttribute("curSrc");
    oImg.onload=function(){
        img.src = this.src;
        utils.setCss(img,'display','block');
        fedoIn();
    };
    img.log = true;
}
function callImg(){
    for(var i=0;i<imgs.length;i++){
        var cueData = img[i];
        var a = utils.win('clientHeight')+utils.wi
    }
}

