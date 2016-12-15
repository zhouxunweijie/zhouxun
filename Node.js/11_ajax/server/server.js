/**
 * Created by zhufengpeixun on 2016/11/20.
 */
var http = require('http');//����http������
var fs = require('fs'); //=> fileStream
var url = require('url');// ��url��ʽΪ���󣬷��㴦��
var path = require('path');// ����·��
var querystring = require('querystring'); // ��url�е����������ʽ��Ϊ���󣬷��㴦��

/**
 * ��ȡ�ļ�
 * @param path �ļ�·��
 * @param response http��Ӧ
 */
function readFile(path, response) {
    fs.readFile(path, function (err, data) {
        if (err) {
            response.writeHead(500);
            response.end('can not found this file : ' + path);
        } else {
            response.writeHead(200);
            response.end(data);
        }
    });
}
// ����ȫ�ָ�Ŀ¼
var ROOT_PATH = path.resolve('../');
var bottleList = [];
var server = http.createServer(function (request, response) {
    // ����û�������Ǹ�Ŀ¼��/�� ��Ư��ƿ��ҳ�淵�ظ������
    var urlData = url.parse(request.url, true);
    // �ж��û��Ƿ�������Ǹ�Ŀ¼
    if (urlData.pathname === '/') {
        // 1����ȡƯ��ƿ��html
        // 2����html���ݷ��ظ������
        readFile('../bottle/bottle.html', response);
    } else if (urlData.pathname === '/throwBottle') {
        var data = '';
        // ���ڽ�����������͹���������
        request.on('data', function (chunk) {
            data += chunk;
        });
        // ���������������
        request.on('end', function () {
            // ��ʽ����������
            data = querystring.parse(data);
            // ���ظ������200
            response.writeHead(200,
                {'Content-Type': 'application/json'}
            );
            // �ж���������͵ĵĲ������Ƿ���content�ֶ�
            if (data.content) {
                // �ѷ��͹�����Ư��ƿ���ݴ洢����
                bottleList.push(data.content);
                // ���سɹ�
                response.end('{"code":0}');
            } else {
                // ����ʧ��
                response.end('{"code":1}');
            }

        });

    } else if (urlData.pathname === '/getBottle') {
        // ��BottleList�������ȡһ�� ��������±�
        var index = Math.floor(Math.random() * bottleList.length);
        // ��������±� ��ȡƯ��ƿ����
        var item = bottleList[index];
        response.writeHead(200, {'Content-Type': 'application/json'});
        var result = {
            code: 0,
            data: {content: ''}
        };
        // ��Ư��ƿ����
        if (item) {
            result.data.content = item;
        } else {
            result.code = 1;
        }
        // ���ظ������
        response.end(JSON.stringify(result));
    } else if (urlData.pathname === '/crossOrigin') {
        //response.end('hello cross origin');
        //response.end('console.log("hello cross origin")');
        // http://127.0.0.1:8080/crossOrigin?key=d
        // ��ȡ��������е��Ǹ�key
        var key = urlData.query.key;
        //response.end('var ' + key + '="hello cross origin";');
        response.end( key + '("hello cross origin");');
        // =>d("hello cross origin");
    } else {
        // ���ݸ�Ŀ¼����url��pathname
        var _path = path.resolve(ROOT_PATH, urlData.pathname.slice(1));
        readFile(_path, response);
    }
});

// �����˿�
server.listen(8080, '127.0.0.1', function () {
    console.log('server start successful');
});