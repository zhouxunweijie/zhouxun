var http = require('http'),
    url = require('url'),
    fs = require("fs");

var server1 = http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true),
        pathname = urlObj.pathname,
        query = urlObj.query;//储存了客户端通过问号传参的方式传递过来的参数值，以对象键值对的方式储存
    //静态资源文件的请求（HTML|CSS/JS...）
    var reg = /\.([0-9a-zA-Z]+)/i;
    if(reg.test(pathname)){
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = "text/plain";
        switch (suffix){
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case  'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        try{
            var conFile = fs.readFileSync('.'+ pathname,'utf-8');
        }catch(e){
            conFile = 'not found';
            suffixMIME = 'text/plain';
        }
        response.writeHead(200,{'content-type':suffixMIME+';charset = utf-8;'});
        response.end(conFile);
        return;
    }

    //处理客户端请求的API接口
    //真实项目当中所有的客户信息应该都存在数据库中（mongodb、mysql、sqlserver、oracle...）,但是我们本次用一个JSON文档临时储存一下即可
    var data = fs.readFileSync('./json/custom.json','utf-8');
    data.length ===0?data = '[]' : null;//防止JSON在转化的时候，如果转换的是空字符串会报错
    data = JSON.parse(data);

    //初始我们需要返回的数据，以后根据需求把返回的数据进行更换即可
    var result = {
        code:1,
        msg:'error',
        data:null
    };

    //客户端需要获取全部的客户信息，后台按照API文档定义的格式，把需要的数据返回即可
    if(pathname === '/gatAllList'){
        if(data.length>0){
            result = {
                code:0,
                msg:'success',
                data:data
            }
        }
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    };
    //客户端想要获取指定的客户信息，ID也通过问号传参的方式传递给服务器了，我们只需要早所有的客户信息中把ID相同的那一项返回给客户就可以了
    if(pathname == '/getInfo'){
        var cusId = query['id'];
        data.forEach(function(item,index){
            if(item['id'] ==cusId){//建议使用两个等行，因为客户端传递过来的ID解析出来后是字符串的
                result = {
                    code:0,
                    msg:'success',
                    data:item
                };
                return false;//结束Foreach循环
            }
        });
        response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    };

    //客户端想实现的是增加的功能，通过请求主体把内容传递给服务器，服务器首先把主题内容获取到，然后存在原来的数组中，然后把最新的整体数据写入到JSON文件中，最后告诉客户端增加是成功还是失败
    if(pathname ==='/addInfo'){
        var reqData = '';
        request.on('data',function(chunk){//后台接受客户端请求主体信息：分多次接受，每一次接受都会触发事件，chunk就是每一次接收到的内容
            reqData +=chunk;
        });
        request.on("end",function(){
            //把传进来的内容储存到原数组当中:在存储之前，需要给新增加的客户安排一个唯一的ID（所有客户信息中最大的ID+1即可，如果之前没有，那么新增这个就是1）
            reqData = JSON.parse(reqData);
            reqData['id'] = reqData.length === 0? 1: parseInt(data[data.length-1]['id']) + 1;

            data.push(reqData);

            //把最新的整个数据写入到JSON文件中
            fs.writeFileSync('./json/custom.json',JSON.stringify(data),'utf-8');

            //返回结果
            result = {
                code:0,
                mag:'success'
            };
            response.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        })
    }
});

server1.listen(1111,function(){
    console.log('ok 1111')
});




















