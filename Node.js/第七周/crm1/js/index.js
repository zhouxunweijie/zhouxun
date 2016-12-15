var banner = document.getElementById('banner');

ajax({
    url:'/getAllList',
    type:'get',
    cache:false,
    dataType:'json',
    success:function(result){
        if(result && result.code == 0){
            var data = result.data;
            dataList(data);
        }
    }
})

function dataList(data){
    var str = '';
    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str += '<li>';
        str += '<span>'+cur.id+'</span>';
        str += '<span>'+cur.name+'</span>';
        str += '<span>';
        str += '<a href="table.html?id='+cur.id+'">修改</a>';
        str += '<a href="javascript:;" data-id="'+cur.id+'">删除</a>';
        str += '</span>';
        str += '</li>';
    }
    banner.innerHTML = str;
}

banner.onclick = function(e){
    e = e || window.event;
    var tar = e.target || e.srcElement;
    var tarName = tar.tagName.toUpperCase();
    if(tarName == 'A' && tar.innerHTML == "删除"){
        var tarId = tar.getAttribute("data-id");
        var flag = confirm("你确定要删除吗？");
        if(flag){
            ajax({
                url:'/removeInfo?id='+tarId,
                dataType:'json',
                type:'get',
                cache:false,
                success:function(result){
                    if(result && result.code == 0){
                        banner.removeChild(tar.parentNode.parentNode);
                    }
                }
            })

        }
    }
}
