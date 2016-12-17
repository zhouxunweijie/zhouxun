//Buffer是global上的一个属性
// console.log(Buffer);//文件可能会被读取到内存中，二级制，展现给我们的却是16进制

//每个位都是由二进制组成  8个位 = 1B   1024B = 1k     1024k = 1m

//buffer中有好多字节组成类似于数组的东西，没个字节最大是多少

//1.声明buffer 一旦声明就需要给一个固定的长度
//2.长度（utf8一个汉字几个字节 3个）
//var buffer = new Buffer(3);//3个字节
//buffer.fill(0);//手动清零
//console.log(buffer);//随机抓过来三个字节的内存，默认为随机的

//字符串（字符串具有不变性）
// buffer = new Buffer('珠峰','utf8');
//console.log(buffer);

//数组（大于255 对256取模 小于0加上256）
//var buffer = new Buffer([1,2,3]);//不识别的都是0

//buffer的常用方法
//1.write
//var buffer1 = new Buffer(12);
//var str = '珠峰培';
//var str1 = '训';
//string:写入的内容
//offset：写入的偏移量
//length：长度
///encoding :编码格式
//buffer1.write((str+str1),0,12,'utf8');

//console.log(buffer1.toString());//将buffer转换为字符串

//2.copy(将多个buffer拷贝到一个大buffer上)
// var buffer = new Buffer(12);
//var buffer1 = new Buffer('珠峰');
//var buffer2 = new Buffer('培训');
//targetBuffer 拷贝的目标
//targetStart 目标的开始位置
//sourceStart  要拷贝内容的开始
//sourceEnd  要拷贝内容结束 后两个参数可以省略，默认从头拷贝到尾部
//buffer.copy(buffer,0);
//buffer1.copy(buffer,6);
//.log(buffer,toString());

//3 拥有数组的部分方法，有length，有forEach 有slice 有下标
//var buffer = new Buffer([1,2,3]);
//buffer.forEach(function(item,index){
    //console.log(arguments);
//});
//相当于slice产生一个新的buffer，但是新buffer和老buffer里面的东西是一个东西
//var newBuffer = buffer.slice(0);

//buffer自己不能变小或变大，但是可以用concat进行拼接
var buffer1 = new Buffer('zhufeng');
var buffer2 = new Buffer('peixun');
//concat是构造函数上的方法

Buffer.myConcat = function(list,totalLength){
    //1.判断totalLength是否传递，默认计算一个总长度，有的话直接写啥就是啥
    //2.构建一个大的buffer，需要将每一个小buffer拷贝到大buffer上，
    // 如果过长保留有效区  截取有效长度slice
    if(typeof totalLength == 'undefined'){
        totalLength = 0;
        list.forEach(function(buffer){
            totalLength +=buffer.length;
        })
    }
    var buffer = new Buffer(totalLength);
    var index = 0;//维护偏移量
   list.forEach(function(item,index){
       item.copy(buffer,index);
       index +=item.index;//下次拷贝在上一次的基础上再次拷贝
    });
    return buffer.slice(0,index);
};
var newBuffer = Buffer.concat([buffer1,buffer2],12);

