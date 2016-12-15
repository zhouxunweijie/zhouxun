var http = require('http'),
    url = require('url'),
    fs = require('fs');
var sever1 = http.createServer(function (request,response){  //创建一个服务  requset 请求   response  响应
    var urlObj = url.parse(request.url,true),//解析客户端请求地址中的文件目录名称以及传递给当前服务器的数据内容
        pathname = urlObj['pathname'],//获取接受的值里面的请求资源名称
        query = urlObj['query'];//获取问号传参的内容，并且是以对象键值对的方式储存的

    //静态资源文件的处理
    var reg = /\.([a-z]+)/i;//声明一个正则，是为了匹配url中的地址的最后的后辍名
    if(reg.test(pathname)){  //如果正则匹配成功，那么把当前的格式记录下来，在IE中不识别请求文件的格式
        var suffix = reg.exec(pathname)[1].toUpperCase(), //将文件地址的后辍名捕获到，并且转化为大写
            //根据请求的文件的后缀名获取到当前文件的MIME类型
            suffixMIME = 'text/plain'; //设置默认的TXT格式
        switch (suffix){ //循环每一次获取的文件格式，并且通过他的后辍名是什么，那么就给他设置为什么格式
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        var conFile = 'file is not found',//声明一个字符串在请求的文件不存在的时候会返回这句话，不会报错，影响下一次的请求操作
            status = 404; //设置一个默认状态值是404
        try{//如果客户端请求的资源不存在，我们如果不加try catch 服务会终止
            conFile = fs.readFileSync('.'+ pathname,'utf-8');//同步操作，按照指定的文件目录用utf-8格式读取文件中的内容或者代码（读取出来的都是字符串格式）
            status = 200; //将状态码设置为成功
        }catch(e){ //如果文件没有获取到那么就会返回上面声明的字符串
            suffixMIME = 'text/plain';//如果没有获取到会将文件格式设置为TXT格式
        }
        response.writeHead(status,{'content-type': suffixMIME + ';charset=utf-8;'});//重写响应头信息，告诉浏览器我们返回的内容是什么样的MIME类型&&指定返回的格式是utf-8编码格式2
        response.end(conFile);
        return;
    }//通过匹配后缀名，将请求的文件返回，并且重写响应头信息

    //当我们用API接口来获取文件的时候，就不会进入到正则配的正则判断里，所以直接会到这里执行，如果判断生效的话那么里面的代码执行完就会return，慢哦下面的这些代码就不会执行了

    //API接口的处理
    var customData = fs.readFileSync('./json/custom.json','utf-8');//声明一个变量用来保存获取回来的文件
    customData = customData.length ===0?'[]': customData;//为了防止我们customData中什么都没有。如果是一个空字符串，那么JSON.parse会报错
    customData = JSON.parse(customData);//将json格式的字符串转换为json格式的对象
    var result = {code:1,msg:'error',data:null};//在API接口中需要返回这三个值，那么我们在判断之前就先声明一个对象，用来存这三个值

    if(pathname === '/getAllList'){  //获取所有的客户信息
        if(customData.length>0){ //如果获取的文件里面有东西，那么它的length就不会是一
            result = {  //如果里面有东西，那么就重新写要返回的数据信息
                code:0,
                msg:"success",
                data:customData
            }
        }
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});//要返回的数据信息
        response.end(JSON.stringify(result));//将转化为json格式的字符串
        return;
    }

    if(pathname === '/addInfo'){
        var requestStr ='';
        request.on('data',function(chunk){ //服务器端获取客户端传过来的主体请求是一点点传进来的，data是要传过来的内容，chunk是每一次传过来的数据
             requestStr +=chunk;
        });
        request.on('end',function(){ //end是服务器已经将传进来的参数接受成功
            requestStr = JSON.parse(requestStr);//将传进来的数据转化为JSON格式的对象
            requestStr['id'] = customData.length === 0? 1:parseFloat(customData[customData.length-1]['id'])+1;//获取所有数据的最后一项的ID，给他加一就是当前的项ID值
            customData.push(requestStr);
            fs.writeFileSync('./json/custom.json',JSON.stringify(customData),'utf-8');//同步状态下查找当前地址，将内容转化为字符串，并且以utf-8的格式返回
            result = {
                code:0,
                msg:'success'
            };
            response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        });
        return;
    }
    if(pathname === '/updateInfo'){
        requestStr = '';
        request.on('data',function(chunk){
            requestStr +=chunk ;
        });
        var flag = false;
        request.on('end',function(){
            requestStr = JSON.parse(requestStr);
            customData.forEach(function(item,index){
                if(requestStr['id'] == item['id']){
                    customData[index] = requestStr;
                    flag = true;
                }
                return false;
            });
            fs.writeFileSync('./json/custom.json',JSON.stringify(customData),'utf-8');
            result = {
                code:0,
                msg:'success'
            };
            response.writeHead(200,{'content=type':'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        });
        return;
    }
    //根据传进来的客户的ID获取到某一个具体的客户的信息
    if(pathname === '/getInfo'){
        var customId = query['id']; //把传进来的ID获取到
        customData.forEach(function(item,index){  //遍历数据数组，
            if(item['id'] == customId){ //如果对象中的属性名id的属性值等于问号传参的值，那么就将数组中的第几个对象返回给客户端
                result = {
                    code:0,
                    msg:'success',
                    data:customData[index]
                };
                return false;
            }
        });
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }
    if(pathname === '/removeInfo'){
        customId = query['id'];
        customData.forEach(function(item,index){
            if(item['id'] == customId){
                customData.splice(index,1);
                fs.writeFileSync('./json/custom.json',JSON.stringify(customData),'utf-8');
                result = {
                    code:0,
                    msg:'success'
                };
                return false;
            }
        });
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
    }
});

sever1.listen(6688,function(){  //给当前的服务监听一个端口
    "use strict";
    console.log('ok')
})









