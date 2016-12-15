
function ajax(opacity){
    var con = {
        data:null,
        url:null,
        dataType:'text',
        async:true,
        cache:true,
        success:null,
        error:null,
        type:"get"
    };
    for(var key in opacity){
        if(opacity.hasOwnProperty(key)){
            con[key] = opacity[key];
        }
    };

    var xhr = new XMLHttpRequest;
    if(/^(get|head|delete)$/i.test(con.type) && con.cache == false){
        var that = con.url.indexOf('?')===-1?'?':"&";
        con.url += that + '_='+Math.random();
    }
    xhr.open(con.type,con.url,con.async);
    xhr.onreadystatechange = function(){
        if(xhr.status == 200){
            if(xhr.readyState == 4){
                var text = xhr.responseText;
                switch (con.dataType){
                    case 'json':
                        text = 'JSON' in window? JSON.parse(text):eval('('+text+')');
                        break;
                    case 'xml':
                        text = xhr.responseXML;
                        break;
                }
                con.success && con.success.call(xhr,text);
            }
        }
        typeof con.error == 'function'?con.error.call(xhr,xhr.responseText):null;
    };
    if(con.data != null){
        con.data = JSON.stringify(con.data);
    }
    xhr.send(con.data);
}
