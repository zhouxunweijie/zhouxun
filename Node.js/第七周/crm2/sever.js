var http = require('http'),
    url = require('url'),
    fs = require('fs');

var server1 = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];

    var reg = /\.([a-z]+)/i;
    if(reg.test(pathname)){
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix){
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
        var conFile = 'file is not found',
            status = 404;
        try{
            conFile = fs.readFileSync('./json/custom.json','utf=8');
            status = 200;
        }catch(e){
            suffixMIME = 'text/plain';
        }
        res.writeHead(status,{'content-Type':suffixMIME +';charset=utf-8;'});
        res.end(conFile);
        return;
    }

    var cus = fs.readFileSync('./json/custom.json','utf-8');
    cus = cus.length === 0? "[]":cus;
    cus = JSON.parse(cus);
    var result = {
        code:1,
        msg:'error',
        data:null
    };

    if(pathname == '/getAllList'){
        if(cus.length > 0){
            result= {
                code:0,
                msg:'success',
                data:cus
            },
            res.writeHead(200,{'content-Type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
            return;
        }
    }

    if(pathname == '/getInfo'){
        var cur = query['id'];
        cus.forEach(function(item,index){
          if(item['id'] == cur){
              result ={
                  code:0,
                  msg:'success',
                  data:cus[index]
              };
              return false
          }
        });
        res.writeHead(200,{'content-Type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    if(pathname == '/removeInfo'){
        cur = query['id'];
        cus.forEach(function(item,index){
            if(item['id'] == cur){
                cus.splice(index,1);
                fs.writeFileSync('./json/custom.json',JSON.stringify(cus),'utf-8');
                result = {
                    code:0,
                    msg:'success'
                }
            }
            return false;
        });
        res.writeHead(200,{'content-Type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    if(pathname == '/upDataInfo'){
        var str = '';
        req.on('data',function(chunk){
            str += chunk;
        });
        req.on('end',function(){
           str = JSON.parse(str);
            cus.forEach(function(item,index){
                if(item['id'] == str['id']){
                    cus[index] = str;
                }
                return false
            });
            fs.writeFileSync('./json/custom.json',JSON.stringify(cus),'utf-8');
            result = {
                code:0,
                mag:'success'
            };
            res.writeHead(200,{'content-Type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));

        });
        return;
    }

    if(pathname == '/addInfo'){
        str = '';
        req.on('data',function(chunk){
            str += chunk;
        });
        req.on('end',function(){
            str = JSON.parse(str);
            str['id'] = cus.length == 0? 1 : parseFloat(cus[cus.length-1]['id'])+1;
            cus.push(str);
            fs.writeFileSync('./json/custom.json',JSON.stringify(cus),'utf-8');
            result = {
                code:0,
                msg:'success'
            };
            res.writeHead(200,{'content-Type':'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
    }

})

server1.listen(1212,function(){
    "use strict";
    console.log('ok')
})