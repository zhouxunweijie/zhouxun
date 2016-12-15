/**
 * Created by 8 on 2016/10/13.
 */
//先获取表格中要操作的元素
var tableBox =document.getElementById("table");
var table=tableBox.getElementsByTagName('table')[0];
var tHead=table.tHead;//表格中特殊的获取方式  获取表头
var tHeadRow=tHead.rows[0];//tHead下所有行的第一行
var ths=tHeadRow.cells;//表格第一行下所有的单元格（列）
var tBody=table.tBodies[0];//获取表格中所有的tBody中的第一个
var tBodyTrs=tBody.rows;//获取tBody下所有的行
console.log(tBodyTrs);//这里并不存在任何一行，但是在绑定数据之后并不用重新获取，这是由于dom的映射 =》获取的元素集合会随着页面内元素的增加或者删除，集合的长度也会随之增加或者删除
//在date,txt这个文件中伪造了一些数据，由于这个数据都是在txt文本文件中，所以这些数据暂时就是一个字符串，如果换成JSON格式还需要处理
//通过Ajax来获取这些元素

// Ajax :Asjnc (异步)   javascript and XML
//作用：专门用来去后台获取数据的
/*
* 步骤：1 先创建一个异步对象 => 就是去后台拿数据载体
*       2约定好方式   xhr.open(以什么样的方式去拿get/post,去哪拿数据date.txt,同步还是异步)
      3 约定状态  绑定事件onreadystatechange  readyState == 4 && status==200  这才是成功返回
            404  找不到页面
            200  成功 => 2 开头的都是成功
            304  本地缓存
            501  服务端错误
      4 出发 xhr.send(null)

* */


//同步和异步：同步是如果上一个任务没有完成，那么下一个任务开始
//              异步是可以同时进行多个任务
//              同步阻塞代码运行 ，异步不堵塞代码运行


//这个自运行函数负责获取数据
(function getDate(){
    var xhr=new XMLHttpRequest();//固定写法，创建一个异步对象载体，这个xhr就是负责要去后台获取数据的
    xhr.open('get','date.txt',false);//请求分get和post,date.txt这个参数就是请求的url.false同步/true异步
//    为什么采用同步：数据要是没有获取到，那么下面的其他操作就不用在继续了
    xhr.onreadystatechange=function(){
        //只要xhr的状态改变就会触发这个事件。
        if(xhr.readyState==4 && xhr.status==200){
            //这两个状态组合在一起才是成功返回并且携带数据
            //readyState这个状态代表的xhr是否成功返回
            //    xhr.status 代表的xhr还携带data回来的
            //    既然数据回来了，数据肯定在xhr身上
            window.data=utils.JsonParse(xhr.responseText);//xhr的响应文本，数据就在这个属性上
            //把xhr.responseText赋值给window.data =》相当于添加了一个全局变量data =》只要成功我在外面打印data就不会报错
            // xhr.responseText是字符串 => date.tet是文本文件
        }
    };
    xhr.send(null);//xhr出发
})();
console.log(data);//是字符串
//数据已经成功获取到，现在需要把获取到的数据，添加到页面中 =.>数据绑定

;(function bindDate(){
    if(window.data){  //要么是数组或者是undefined
        var frg=document.createDocumentFragment();
    //    只要是数组我们就可以循环，数组的每一项在表格中就是一行=>tbody的行数和length是相同的
        for(var i=0;i<data.length;i++){ //循环执行的次数取决于data里面有多少个对象，每一个对象都是一个tr
            var curDate=data[i];//curData就是每次循环时候数组中的每一个对象，其实也就是每一条数据，curData都包括五个属性
            var tr=document.createElement("tr");
            for(var key in curDate){ //只要循环一次我们就创建一个td ,td跟有多少组属性是相同的
                var td=document.createElement("td");//td里面的内容就是curData的属性值了
                if(key==='sex'){
                    console.log(key);
                    td.innerHTML=curDate[key]==1?"男":"女"

                }else{
                    td.innerHTML=curDate[key];
                }
                tr.appendChild(td);
        }
            frg.appendChild(tr);//把行添加到文档碎片

        }
        tBody.appendChild(frg);//把文档碎片
        frg=null;
    }
})();
//隔行变色
function  changeColor(){
    for( var i=0;i<tBodyTrs.length;i++){
        tBodyTrs[i].className='c'+i%2;
    }
}
changeColor();

//就是tBody里面的行按照年龄、身高、体重  。。。上下移动
function sort(n){ //当前按照那一列去排序取决于这个n参数，这个n只有在事件发生的那一刻才能确定是按照哪一列去排序=》那么n的值只有在事件发生的那一刻才能确定，只有this最可靠了。
    var tBodyTrsAry=utils.listToArray(tBodyTrs); //把类数组都转化为数组
    //console.log(this);
    for(var i=0;i<ths.length;i++){
        if(ths[i]!=this){  //循环所有的表头只要不是当前点击的这一个，那么我就全部恢复成-1，避免间隔点击时排序的时候按照降序排列
            ths[i].sortFlag=-1
        }
    }
    this.sortFlag *=-1;
    var That=this;//用这个That变量保存this，因为sort方法中也使用this，但是this是window
    tBodyTrsAry.sort(function(a,b){
        //a,b分别都是代表tBody
        //需要判断每次排序的时候相邻上下两行其中的内容是不是 数字，如果不是那么使用localeCompare的方法来做字符串排序，=>只要有一个不是
        var _a= a.cells[n].innerHTML;
        var _b= b.cells[n].innerHTML;
        if(isNaN(_a)||isNaN(_b)){
            return (_a.localeCompare(_b))*That.sortFlag;
        }
        return (_a - _b)*That.sortFlag;
    });
    //把排好序的数组（表格下面的所有行）还需要回填到表格中，这样才是排序
    var frg=document.createDocumentFragment();
    for(var i=0;i<tBodyTrsAry.length;i++){
        frg.appendChild(tBodyTrsAry[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor();//每次排序后隔行变色就乱了，重新执行隔行变色
}
//给每一个表头绑定事件
;(function(){
   //循环绑定事件给表头
    for(var i=0;i<ths.length;i++){
        //不是给所有的表头列都绑定事件，是给带cursur这个类的绑定，在绑定之前要做一个判断，判断是否存在cursor这个类
        if(ths[i].className=="cursor")
        ths[i].sortFlag=-1;//再点击切换
        ths[i].index=i;//给每一个表头都添加一个自定义属性，用来保存当前表头的索引=》当点击事件发生的时候就按照这个索引来排序
        ths[i].onclick=function(){
            //点击表头的时候，就应该排序了
            console.log(this);//点击那个表头，但是this上没有索引，在事件发生之前就给每一个this添加一个自定义属性
            sort.call(this,this.index);//点击事件发生的时候 我才知道
        }
    }
})();







