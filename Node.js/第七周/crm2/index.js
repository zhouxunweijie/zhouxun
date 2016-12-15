var banner = document.getElementById('banner');

ajax({
    url:'/getAllList',
    dataType:'get',
    cache:false,
    type:'get',
    success:function(result){
        if(result && result.code == 0){
            var data = result.data;
            listData(data);
        }
    }
});

function listData(data){
    var str = '';
    for(var i=0;i<data.length;i++){

    }
}
