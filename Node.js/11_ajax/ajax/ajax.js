/**
 * Created by zhufengpeixun on 2016/11/19.
 */

(function () {
    /**
     * ajax�����߼�
     * @param {Object} options ���ö���
     * @return {xhr} ajax����
     */
    function ajax(options) {
        // У������Ƿ�Ϸ�
        if (!tools.isType(options, 'Object')) {
            throw new TypeError('�������ʹ���');
        }
        // ajax ��һ�� ��ȡajax����
        var xhr = tools.getXHR();
        // ����һ���ж��Ƿ�Ϊgetϵ��������
        var isGet = /^get|head|delete$/ig;
        // ajax�ڶ���
        var method = options.method || 'get';
        var requestURI = options.url || '/';
        var async = options.async === undefined ? true : !!options.async;
        // 1�����Ϊget��������Ҫ��data��ʽ��Ϊquerystring�ĸ�ʽ����ƴ�ӵ�url�ĺ���
        var data = tools.param(options.data);
        if (isGet.test(method) && data) {
            // �Ѹ�ʽ����ɵ�dataƴ�ӵ�url�ĺ���
            requestURI = tools.appendToURI(requestURI, data);
            // ��Ϊgetϵ��������Ҫ��send�������������������ｫdata����Ϊnull
            data = null;
        }
        // 2�������ʹ�û��棬����Ҫ��url�����һ���������
        if (options.cache === false) {
            var randomText = Math.random();
            requestURI = tools.appendToURI(requestURI, '_=' + randomText);
        }

        // ��http����
        xhr.open(method, requestURI, async);

        // �Զ��������ײ�
        if (options.headers && xhr.setRequestHeader) {
            for (var n in options.headers) {
                if (!options.headers.hasOwnProperty(n)) {
                    continue;
                }
                xhr.setRequestHeader(n, options.headers[n]);
            }
        }

        // step 3 ������Ӧ
        xhr.onreadystatechange = function () {
            // �ж������Ƿ����
            if (xhr.readyState === 4) {
                // ��ȡ��Ӧ����
                var responseText = xhr.responseText;
                // �ɹ�
                if (/^2\d{2}$/.test(xhr.status) || xhr.status === 304) {
                    // �ж��Ƿ���Ҫ����Ӧ�����ʽ��Ϊjson����
                    if (options.dataType === 'json') {
                        // Ϊ�˷�ֹjson parseִ�б���
                        try {
                            responseText = tools.parseJSON(responseText);
                        } catch (ex) {
                            // ��������򽫱�����Ϣ���͸�error����������return
                            options.error(ex);
                            return;
                        }
                    }
                    // �ɹ�ִ��success����
                    options.success(responseText);
                } else if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    // ʧ��
                    options.error(xhr.status);
                }
            }
        };

        // STEP 4 ����http����
        xhr.send(data);
        return xhr;
    }

    var tools = {
        /**
         * ���ö��Ժ�����ȡajax����
         */
        getXHR: (function () {
            var list = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }], xhr;
            while (xhr = list.shift()) {
                try {
                    xhr();
                    return xhr;
                } catch (ex) {

                }
            }
            throw new ReferenceError('��ǰ�������֧��ajax����');
        })(),
        /**
         * �ж���������
         * @param {*} data ��Ҫ�ж����͵�����
         * @param {string} type ��������
         * @return {boolean} ���������Ƿ����
         */
        isType: function (data, type) {
            return Object.prototype.toString.call(data) === '[object' + ' ' + type + ']';
        },
        /**
         * �����ݸ�ʽ��Ϊquerystring�ĸ�ʽ
         * data => {a:1,b:2} => a=1&b=2
         * @param {*} data
         * @return {string} �������
         */
        param: function (data) {
            // ��Ϊ�÷������Ƿ���һ���ַ�������������Ѿ���һ���ַ�������û�б�Ҫ����ֱ�ӷ���
            if (this.isType(data, 'String')) {
                return data;
            }

            if (data === undefined || data === null) {
                return '';
            }
            if (this.isType(data, 'Object')) {
                var arr = [];
                for (var n in data) {
                    // ����ȡԭ����������
                    if (!data.hasOwnProperty(n)) continue;
                    // ��Ϊurl�в��ܴ��ڷ�Ӣ���ַ�����������ʹ��encodeURIComponent������ʽ��
                    arr.push(encodeURIComponent(n)
                        + '='
                        + encodeURIComponent(data[n]));
                }
                return arr.join('&');
            }
            return data.toString();
        },
        /**
         * ���ַ���ƴ�ӵ�url�ĺ���
         * @param url
         * @param padString
         */
        appendToURI: function (url, padString) {
            var hasQuery = /\?/.test(url);
            // ���hasQueryΪtrue ˵��url�д���������������򲻴���
            // www.baidu.com?a=1 + & + b=2
            // www.baidu.com + ? + a=1
            return url + (hasQuery ? '&' : '?') + padString;
        },
        /**
         * ��json�ַ�����ʽ��Ϊjson����
         * @param jsonString
         * @return {Object}
         */
        parseJSON: function (jsonString) {
            if (window.JSON) {
                return JSON.parse(jsonString);
            }
            return eval('(' + jsonString + ')');
        }
    };
    // ��ajax������¶��ȫ�ֻ�����
    this.ajax = ajax;
}());