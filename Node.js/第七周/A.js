function ajax(options){
    var _default = {
        url:null,
        type:"get",
        data:null,
        dataType:'text',
        cache:true,
        success:null,
        error:null,
        async:true
    };
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key] = options[key];
        }
    };
    var xhr = new XMLHttpRequest;
   if(/^(get|delete|head)$/i.test(_default.url)&& _default.cache === false){
     var that = _default.url.indexOf('?')===-1?'?':'&';
       _default.url += that + '_='+Math.random();
   }
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange = function(){
        if(/^2\d{2}$/.test(xhr.status)){
            if(xhr.readyState == 4){
                var text = xhr.responseText;
                while(_default.dataType){

                }
            }
        }
    };
    xhr.send(_default.data);
}