//开始加载页面的时候，我们通过API文档的接口
ajax({
    url:'/getAllList',
    type:'get',
    dataType:'json',
    cache:false,
    success:function(result){
        if(result && result.code == 0){
            var data = result.data;
            bindHTML(data);
        }
    }
});
//实现页面的数据绑定
var content = document.getElementById("content");
function bindHTML(data){
    var str = '';
    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str +='<li>';
        str +='<span>'+cur.id+'</span>';
        str +='<span>'+cur.name+'</span>';
        str +='<span>';
        str +='<a href="detail.html?id='+cur.id+'">修改</a>';//传递一个ID值就是为了到详情页的时候能够区分是增加还是修改，以及要修改那一个客户信息，传了ID就是修改，传递的值是多少就是修改谁
        str +='<a href="javascript:;" data-id="'+cur.id+'">删除</a>';//自定义属性中储存了一个客户的ID，这样点击的时候，想要获取
        str +='</span>';
        str +='</li>';
    }
    content.innerHTML = str;
}
content.onclick = function(e){
    e = e || window.event;
    var tar = e.target || e.srcElement,
        tarTag = tar.tagName.toUpperCase();
    if(tarTag === "A" && tar.innerHTML ==='删除'){
        var customId = tar.getAttribute('data-id');
        var flag=confirm("你确定要删除["+customId+"]吗？");
        if(flag){
            ajax({
                url:'/removeInfo?id='+customId,
                type:'get',
                dataType:'json',
                cache:false,
                success:function(result){
                    if(result && result.code == 0){
                        content.removeChild(tar.parentNode.parentNode);
                    }
                }
            })
        }
    }

}
