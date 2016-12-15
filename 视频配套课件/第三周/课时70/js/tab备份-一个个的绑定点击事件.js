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

        //->ʵ�־�����л�����
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onclick = function () {
                utils.addClass(this, "select");

                var curSiblings = utils.siblings(this);
                for (var i = 0; i < curSiblings.length; i++) {
                    utils.removeClass(curSiblings[i], "select");
                }

                var index = utils.index(this);
                for (i = 0; i < divList.length; i++) {
                    i === index ? utils.addClass(divList[i], "select") : utils.removeClass(divList[i], "select");
                }
            }
        }
    }

    window.zhufengTab = tabChange;
}();

