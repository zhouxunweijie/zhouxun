(function(pro){
   function tent(){
       var obj = {};
       var reg = /([^#&=?]+)=([^#&=?]+)/g;
       this.replace(reg,function(){
           obj[arguments[1]] = arguments[2];
       });
       return obj
   }
    pro.tent = tent;
})(String.prototype);


var table1 = document.getElementById("table1");
var table2 = document.getElementById('table2');

var conURL = window.location.href,
    conObj = conURL.tent(),
    conId = conObj['id'],
    isload = typeof conId === 'undefined'?false:true;
console.log(conId);
if(isload){
    ajax({
        url:'/getInfo?id='+conId,
        dataType:'json',
        cache:false,
        type:"get",
        success:function(result){
            if(result&&result.code == 0){
                var data = result.data;
                table1.value = data.name;
            }
        }
    })
}

table2.onclick = function(){
    var nameText = table1.value;
   var data = {
       name : nameText
   };
    if(isload){
        data['id'] = conId;
        ajax({
            url:'/upDataInfo',
            data:data,
            type:'post',
            dataType:'json',
            success:function(result){
                if(result && result.code == 0){
                    window.location.href = 'index.html';
                }
            }
        });
        return
    }
    ajax({
        url:'addInfo',
        type:'post',
        data:data,
        dataType:'json',
        success:function(result){
            if(result && result.code === 0){
                window.location.href = 'index.html';
            }
        }
    })
};