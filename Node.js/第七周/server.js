var http = require("http");
var url = require("url");
var fs = require("fs");

var server1 = http.createServer(function(request,response){
        var urlObj = url.parse(request.url,true);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
    //我们在客户端请求的时候，传递的请求地址就是以当前项目为根目录，然后去查处请求的http://localhost/js/index.html;
    //而我们写的SERNER模块也就是放在当前的根目录下的，在代码中写./的意思就是找根目录

    //如果请求的是项目中的资源文件（HTML/CSS/JS/...）,所有的资源文件都有自己的后缀名
    var reg = /\.([0-9a-zA-Z]+)/i;
    if(reg.test(pathname)){
        //为了避免请求的资源文件在项目中不存在，我们在使用readFileSync超找的时候会报错
        //获取当前请求的资源文件的后缀名，根据文件的后缀名计算出对应的MIME类型
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch(suffix){
            case "HTML":
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
        }
        try{
            var conFile = fs.readFileSync("."+pathname,"utf-8");
           var status = 200;
        }catch(e){
            conFile = "NOT FOUND";
            suffixMIME = 'text/plain';
            status = 404;
        }
        //在重写响应头中告诉浏览器当前的资源文件的MIME类型
        response.writeHead(status,{'content-type':suffixMIME+';charset=utf-8;'});
        response.end(conFile);
    }


        //
        //if(pathname ==='/index.html'){
        //    var con = fs.readFileSync('./index.html','utf-8');
        //    response.end(con);
        //}
        //if(pathname === '/table.css'){
        //    var con = fs.readFileSync('./table.css',"utf-8");
        //    response.end(con);
        //}
        //if(pathname ==='/tem.js'){
        //    var con = fs.readFileSync('./tem.js','utf-8');
        //    response.end(con);
        //}

        //只要客户端呢请求一次，本回调函数就会触发一次，还会有两个参数值
    //request：他是一个对象，在这个对象中储存了我们全部的请求信息
          //->request.url:储存了当前客户端请求的资源文件的路径和文件以及问号传递过来的参数值
    //        如果第二个参数传递的是true,会把传递进来的值都已对象键值对的方式处存下来
    //response：它是一个对象，在这个对象当中存储了一些方法，通过这些方法可以让服务把一些内容返回给客户端
    //console.log(url.parse(request.url));
    /*
    * protocol : 协议
    *
    * */

});//创建一个服务，可以传一个函数
//callback:是回调函数，并不是在创建完成服务之后就执行的，当客户端向服务器端发送请求的时候才会执行
//server1.listen(80);//给当前的服务监听端口  （port）：端口号  ,[callback]是当服务创建成功，并且已经监听成功端口号之后做的事情

//如何向当前创建的服务发送请求：
// 1）在浏览器中输入 http://localhost:端口号
// 2）在浏览器中输入http://本机的IP地址：端口号
server1.listen(80,function(){
    console.log("ok")
});


var xhr = new XMLHttpRequest;
xhr.open("head","getServerTime?_="+Math.random(),true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
        var serverTime = xhr.getResponseHeader("Data");
        serverTime = new Date(serverTime);
    }
}
xhr.send(null);

var servertime = xhr.getResponseHeader("Date");
servertime = new Data(servertime)





var http = require("http"),//创建服务，监听端口，接受客户端请求，给客户端返回对应的内容
    url = require("url"),//提供了一些方法，用来解析URL中的每一部分信息的
    fs = require("fs");//提供了一些方法供我们进行I/O操作的

var server = http.createServer(function(requset,response){
    //创建一个新的服务，这个服务中有两个参数一个是
    //requset:他获取的是所有URL穿过来的请求信息
    //requset.url储存了客户端请求的文件地址和问号传参的内容
    //url.parse() :解析URL，返回其组成部分，如果后面加上true，那么requset.url中的问号传参会以键值对的方式保存下来
    var urlObj = url.parse(requset.url,true),
        //urlObj中保存的是url的组成部分；
        pathname  = urlObj.pathname,
        //将请求的路径名称保存下来
        query = urlObj.query;
        //将问号传参的内容保存下来，现在是一个键值对
    var reg = /\.([0-9a-zA-Z]+)/i;
    //声明一个正则，是为了匹配路径名称是不是符合要求，忽略大小写
    if(reg.test(pathname)){
        //获取当前资源文件的后缀名，根据文件的后缀名计算出它对应的MIME类型
        var suffix = reg.exec(pathname)[1].toUpperCase(),
        //用正则捕获到文件的的后缀名，并将它转化为大写
            suffixMIME = 'text/plain';
        //将suffix的格式默认设置为‘text/plain’
        switch(suffix){
            //后缀名为什么格式就设置成什么格式
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/js';
                break;
        }
        try{
            var conFile = fs.readFileSync("."+pathname,"utf-8");
            //同步获取文件中的路径
            var status = 200;
            //将服务器的状态码设置为成功
        }catch(e){
            conFile = "NOT POUND";
            suffixMIME = 'text/plain';
            status = 404;
        }
        response.writeHead(status,{'content-type':suffixMIME +';charset=utf-8;'});
        response.end(conFile);
    }
})
server.listen(80,function(){
    console("ok")
})



















