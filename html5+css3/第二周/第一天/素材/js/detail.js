~function (pro) {
    function queryURLParameter() {
        var obj = {},
            reg = /([^?&=#]+)=([^?&=#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        reg=/#([^?&=#]+)/;
        if (reg.test(this)){
            obj["HASH"]=reg.exec(this)[1];

        }

        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


var submit = document.getElementById('submit');
var userName = document.getElementById('userName');

var nowURL = window.location.href;
var urlObj = nowURL.queryURLParameter(),
    customId = urlObj['id'],
    isUpdate = typeof customId === 'undefined' ? false : true;

if (isUpdate) {
    ajax({
        url: '/getInfo?id=' + customId,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (result) {
            if (result && result.code == 0) {
                var data = result.data;
                userName.value = data.name;
            }
        }
    });

}


submit.onclick = function () {
    var nameText = userName.value,
        data = {
            name: nameText
        };

    if (isUpdate) {

        data['id'] = customId;
        ajax({
            url: '/updateInfo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (result) {
                if (result && result.code == 0) {
                    window.location.href = 'index.html';
                }
            }
        });
        return;
    }

    ajax({
        url: '/addInfo',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (result) {
            if (result && result.code == 0) {
                window.location.href = 'index.html';

            }
        }
    });
};