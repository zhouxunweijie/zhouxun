var http = require("http"),
    url = require("url"),
    fs = require("fs");
var sever1 = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];
    var reg = /\.([a-z]+)/i;
    if(reg.test(pathname)){
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = "text/plain";
        switch (suffix){
            case 'HTML':
                suffixMIME = "text/html";
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        var reqData = "file is not found",
            status = 404;
        try{
            reqData = fs.readFileSync("."+pathname,"utf-8");
            status = 200;
        }catch(e){
            suffixMIME = "text/plain"
        }
        res.writeHead(status,{"content-type":reqData+";charset=utf-8;"});
        res.end(reqData);
        return;
    }



    var cus = fs.readFileSync('../json/custom.json',"utf-8");
    cus = cus.length === 0?"[]":cus;
    cus = JSON.parse(cus);
    var result = {
        code:1,
        msg:'error',
        data:null
    };

    if(pathname === './getAllList'){
        if(cus.length > 0){
            result = {
                code:0,
                msg:'success',
                data:cus
            };
            res.writeHead(200,{'contentType':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        }
        return;
    }//获取所有
    if(pathname === './addList'){
        var str = '';
        req.on('data',function(chunk){
            "use strict";
            str += chunk;
        });
        req.on('end',function(){
            "use strict";
            str = JSON.parse(str);
            str['id'] = cus.length===0? 1 :parseFloat(cus[cus.length-1]['id'])+1;
            cus.push(str);
            fs.writeFileSync('./json.custom.json',JSON.stringify(cus),'utf-8');
            result = {
                code:0,
                msg:'success'
            };
            res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));

        });
        return;
    }//增加
    if(pathname === './upDataList'){
        str = '';
        req.on('data',function(chunk){
            "use strict";
            str  += chunk;
        });
        req.on('end',function(){
            "use strict";
            str = JSON.parse(str);
           cus.forEach(function(item,index){
               if(item['id'] === str['id']){
                   cus[index] = str;
                   result = {
                       code:0,
                       msg:'success'
                   };
                  fs.writeFileSync('./json/custom.json',JSON.stringify(cus),'utf-8');
               }
               return false
           });
            res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }//修改
    if(pathname === './removeList'){
        var len = query['id'];
        cus.forEach(function(item,index){
            "use strict";
            if(item['id'] == len){
                cus.splice(index,1);
                result = {
                    code:0,
                    msg:'success'
                };
                fs.writeFileSync('./json/custom.json',JSON.stringify(cus),'utf-8');
            }
            return false
        });
        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    if(pathname === './getInfo'){
        len = query['id'];
        cus.forEach(function(item,index){
            "use strict";
            if(item['id'] === len){
                result = {
                    code:0,
                    msg:'success',
                    data:cus[index]
                }
            }
            return false
        });
        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
    }
});




sever1.listen(80,function(){
    "use strict";
    console.log("ok");
})