//->ʵ��һ��ѡ��ķ�װ:���ǿ��Է�����,ֻҪ���ѡ�������ṹһ��,��ôÿһ��ʵ�ֵ�˼�붼��һģһ����,Ψһ��һ���ľ��������ĺ��Ӳ�һ��
~function () {
    /*
     * tabChange:��װһ��ѡ��Ĳ��,ֻҪ��ṹ����ͳһ,�Ժ�ʵ��ѡ��Ĺ���,ֻ��Ҫ��ȡ�������ִ�м���ʵ��
     * ->container:��ǰҪʵ��ѡ����������
     * ->defaultIndex:Ĭ��ѡ���������
     */
    function tabChange(container, defaultIndex) {
        var tabFirst = utils.firstChild(container), oLis = utils.children(tabFirst), divList = utils.children(container, "div");
        //->��defaultIndex��Ӧ��ҳ����ѡ�е���ʽ
        defaultIndex = defaultIndex || 0;
        utils.addClass(oLis[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");

        //->ʹ���¼�ί�����Ż����ǵĵ������
        tabFirst.onclick = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            //->˵���ҵ�ǰ����ǵ�LI��ǩ
            if (e.target.tagName.toLowerCase() === "li") {
                detailFn.call(e.target, oLis, divList);
            }
        };
    }

    function detailFn(oLis, divList) {
        //this->��ǰ��������LI
        var index = utils.index(this);
        utils.addClass(this, "select");
        for (var i = 0; i < divList.length; i++) {
            i === index ? utils.addClass(divList[i], "select") : (utils.removeClass(divList[i], "select"), utils.removeClass(oLis[i], "select"));
        }
    }

    window.zhufengTab = tabChange;
}();

