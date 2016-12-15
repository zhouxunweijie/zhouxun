//global 全局对象
//在NODE中global对象的属性可能在程序的任何地方被访问到
//能在程序的任何地方访问到的对象都是global的属性

console.log('log');
console.info('info');
console.error('error');
console.warn('warn');
console.time('cost'); //启用一个计时器

console.timeEnd ('cost');//计时器结束，会输出
console.log(__);

//把参数函数放在下一个事件环中执行
setImmediate(function(){

});

process // 当前NODE 的进程对象
process.cwd(); //  当前的工作的目录
chdir('..');  //修改当前的工作目录
memoryUsage();//   rss: 常驻内存  heapTotal : 堆的总内存  heapUsed:堆已经使用的内存量
nextTick(function(){ });//   放在当前任务页的底部

var util = require('util');//将util模块引进来
//util.inherits(子类，夫类) //子类可以继承夫类的原型上的方法
//子类.protoType =new 夫类.protoType

console.log(util.inspect(child));  //将child对象的转化为在字符串

var obj = {};
obj.name = 'zfpx';

Object.defineProperty(obj,'age',{
    value:120,
    configurable:false,//可配置，是否可以删除此属性
    writable:true,//是否可改值，是否只读
    enumerable:true,//可枚举
})
console.log(util.isArray(''));
console.log(util.isRegExp(/\w+/));
console.log(util.isError());
console.log(util.isObject());

//每一个js文件都是一个独立的模块
//模块内部的变量都是私有变量，外部其他模块无法访问

exports = {} //导出对象

exports.add = add;//向外面暴露一个接口
module.exports = add;//在另一个模块可以直接执行

module;//当前模块
/*
* 1.id  当前模块的ID， 当前文件的绝对路径
* 2 exports: 当前模块的导出对象，一次导出，终身使用
* 3 parent 谁require了这个模块，就是谁生出了这个模块
* 4 children  他require了谁，谁就是他的儿子
* 5 poth   模块查找路径
*
* console.log(require.cache)  查看模块缓存 存放这所有的模块缓存
* delete require.cache[require.resolve('./math.js')]  从模块缓存中删除此模块
* console.log(require.resolve('./math.js'))得到文件模块的绝对路径
*
* 同步异步的区别：
* 同步方法的结果通过函数调用返回值来接受
* 异步方法的的结果通过把回调汉书传过去，然后等结果OK了再由厨师通知服务员
* */

//包和npm
/*
* 1. 创建文件夹并进入
* 2. 初始化  npm init
* 3. 注册用户名  npm adduser
* 4 发布 npm publish
*
*
*
* */

//npm whoami 查看当前我是谁