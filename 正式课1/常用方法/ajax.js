(function(){
    function ajax(options){
        if(!tools.isType(options,'Object')){
            throw new TypeError('参数类型错误');
        }
        var xhr = tools.getXHR();
        var isGet = /^get|head|delete$/ig;
        var method = options.method || 'get';
        var requestURL = options.url || '/';
        var async = options.async === undefined ? true : !!options.async;
        var data = tools.param(options.data);
        if(isGet.test(method)&& data){
            requestURL = tools.appendToURI(requestURL,data);
            data = null;
        }
        if(options.cache ===false){
            var randomText = Math.random();
            requestURL = tools.appendToURI(requestURL,'_='+randomText);
        }
        xhr.open(method,requestURL,async);
        if(options.headers && xhr.setRequestHeader){
            for(var n in options.headers){
                if(!options.headers.hasOwnProperty(n)){
                    continue;
                }
                xhr.setRequestHeader(n,options.headers[n]);
            }
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState ===4){
                var responseText = xhr.responseText;
                if(/^2\d{2}$/.test(xhr.status) || xhr.status === 304){
                    if(options.dataType === 'json'){
                        try{
                            responseText = tools.parseJSON(responseText);
                        }catch(ex){
                            options.error(ex);
                            return;
                        }
                    }
                    options.success(responseText);
                }else if(/^()/)
            }
        }
    }
}())
