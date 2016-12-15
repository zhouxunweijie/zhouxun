//string.prototype
+function(pro){
    //获取URL地址后面问号传参的参数值
    function queryURLParameter(){
        var Obj = {};
        var reg = /([^?&=#]+)=([^?&=#]+)/g;
        this.replace(reg,function(){
            Obj[arguments[1]] = arguments[2];
        });
        return Obj;
    }
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);
//以上是为了将字符串的原型上添加一个方法，这个方法是为了将问号传参后面值获取到，并将它们保存


var submit = document.getElementById("submit");
var userName = document.getElementById("userName");

//进入详情页面的第一件事情;获取当前地址栏URL地址后面问号传参的值（获取那个ID）
var nowURL = window.location.href;//获取当前的URL地址
var urlObj =nowURL.queryURLParameter(),
    customId = urlObj["id"],
    isUpdate = typeof customId ==="undefined"?false:true;
//如果是修改的话，我们首先到ID到服务器上获取到客户信息
if(isUpdate){
    ajax({
        url:"/getInfo?id="+customId,
        type:'get',
        dataType:"json",
        cache:false,
        success:function(result){
            if(result && result.code == 0){
                var data = result.data;
                userName.value = data.name;
            }
        }
    })
}

submit.onclick = function(){
    var nameText = userName.value,
        data = {
            name:nameText
        };//data就是我们准备传递给服务器的内容（在ajax方法库中，会把我们准备的对象转化为JSON格式的字符串）

    //点击提交的时候
    if(isUpdate){

        data["id"] = customId;
        ajax({
            url:'/updateInfo',
            type:'post',
            dataType:'json',
            data:data,
            success:function(result){
                if(result && result.code === 0){
                    window.location.href = 'index.html';
                }
            }
        })
    }

    //发送AJAX请求给服务器，把客户信息按照API文档的要求传递给服务器
    ajax({
        url:"/addInfo",
        type:"post",
        data:data,
        dataType:"json",
        success:function (result){
            if(result && result.code == 0){
                //增加
                window.location.href = "index.html";//在JS当中通过此操作实现页面的跳转即可
            }
        }

    })
};
