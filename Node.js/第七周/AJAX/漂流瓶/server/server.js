var http  = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),//处理路径
    querystring = require('querystring');//将URL中请求参数格式化为对象

function readFile(path,response){
    fs.readFile(path,function(err,data){
        if(err){
            response.writeHead(500);
            response.end("can not found this file :" + path);
        }else{
            response.writeHead(200);
            response.end(data);
        }
    })

}
//定义全局根目录
var ROOT_PATH = path.resolve("../");
var bottlelist = [];
var server = http.createServer(function(request,response){
    //response.write('hello');
    //response.end();
    var urlData = url.parse(request.url,true);
    if(urlData.pathname === '/'){
        //读取漂流瓶的HTML
        readFile('../bottle/bottle.html');
        //把HTML内容返回给浏览器
    }else if(urlData.pathname === '/throwBottle'){
        var data = '';
        request.on('data',function(chunk){
            "use strict";
            data +=chunk;
        });
        //浏览器
        request.on('end',function(){
            //格式化数据
            data = querystring.parse(data);
            response.writeHead(200);
            if(data.content){
                bottlelist.push(data.content);
                response.end('{code:0}');
            }else{
                response.end('{code:1}')

            }
        })
    }else if(urlData.pathname === '/getBottle'){
        //从Bottlelist中随机获取一项
        var index = Math.floor(Math.random() * bottleList.length);
        var item = bottlelist[index];
        response.writeHead(200,{'content':'appliction/json'});
        var result = {
            code:0,
            data:{content:''}
        };
        if(item){
            result.data.content = item;
        }else{
            result.code = 1;
        }
        response.end(JSON.stringify(result));
    }else{
        //根据根目录解析url的pathname
        var _path = path.resolve(ROOT_PATH,urlData.pathname.slice(1));
        readFile(_path,response);
    }


})

server.listen(8080,'127.0.0.1');