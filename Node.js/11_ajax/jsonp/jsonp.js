/**
 * Created by zhufengpeixun on 2016/11/20.
 */
(function () {
    /**
     * jsonp
     * @param requestURI jsonp�ӿڵ�ַ
     * @param data ���͵�����
     * @param query server����õ��������
     * @param callback �ص�����
     */
    function jsonp(requestURI, data, query, callback) {
        // ȫ�ֺ����� ���͸�������
        // ȫ�ֺ����� ����ִ��
        var cbName = 'cb' + counter++;
        // ��dataƴ�ӵ�requestURI��
        requestURI = appendToURI(requestURI, data);
        // ��Ҫ�����������ȫ�ֺ�����ƴ�ӵ�requestURI��
        requestURI = appendToURI(requestURI, query + '=' + cbName);

        // ����ȫ�ֺ�����
        window[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                // ɾ��script��ȫ�ֺ���
                script.parentNode.removeChild(script);
                delete window[cbName];
            }

        };

        var script = document.createElement('script');
        script.src = requestURI;
        //console.log(document.readyState);
        // ���domû�м�����ɵ������ bodyΪnull��bug
        if (document.readyState !== 'loading') {
            document.body.appendChild(script);
            return;
        }

        if (window.addEventListener) {
            window.addEventListener('load', function () {
                document.body.appendChild(script);
            }, false)
        } else {
            window.attachEvent('onload', function () {
                document.body.appendChild(script);
            });
        }

    }

    // �������������ÿ��url����һ���� ��ֹ����
    var counter = 1;
    // �����ݸ�ʽ��Ϊquerystring��ʽ
    function param(data) {
        if (typeof data === 'string') {
            return data;
        }
        if (typeof data === 'undefined' || data === null) {
            return '';
        }
        if (Object.prototype.toString.call(data) === '[object Object]') {
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        }
        return data.toString();
    }

    // ���������ƴ�ӵ�url��
    function appendToURI(url, data) {
        data = param(data);
        if (!data) {
            return url;
        }
        var hasQuery = /\?/.test(url);
        return url + (hasQuery ? '&' : '?') + data;
    }

    this.jsonp = jsonp;
}());
