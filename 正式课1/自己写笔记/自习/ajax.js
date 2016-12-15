function ajax(opacity){
    var _default = {
        url:null,
        data:null,
        dataType:'text',
        async:true,
        cache:true,
        success:null,
        error:null,
        type:'get'
    };
    for(var key in opacity){
        if(opacity.hasOwnProperty(key)){
            _default[key] = opacity[key];
        }
    }
    var xhr = new XMLHttpRequest;
    if(/^(get|delete|head)$/.test(_default.type) && _default.cache === "false"){
        var that = _default.url.indexOf('?')===-1?'?':'&';
        _default.url += that +  '_=' +Math.random();
    }
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(/2\d{2}/.test(xhr.status)){
                var text = xhr.responseText;
                switch (_default.dataType){
                    case 'json':
                        text = 'JSON' in window? JSON.parse(text):eval('('+text+')');
                    break;
                    case 'xml':
                        text =text.responseXML(text);
                        break;
                }
                _default.success && _default.success.call(xhr,text);
            }
            return;
        }
        typeof _default.error === 'function'?_default.error.call(xhr,xhr.responseText):null;
    };
    if(!_default.data === null){
        _default.data = JSON.stringify(_default.data);
    }
    xhr.send(_default.data);
}
