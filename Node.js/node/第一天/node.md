## 模块
- seajs (CMD) requirejs(AMD)
commonjs

node
node的主线程永远是单线程的
单线程 可以先开多个线程
多进程 单线程

单线程  异步I/O 事件驱动

有优点‘是基于JavaScript的语言’验证书=shii

阻塞的非阻塞znrgh;

单线程和多线程
‘多线程’同一时间可以干多件事，只是切换上下文（切换速度特别快）

不管是多核还是单核，都可以开多进程

服务员有两个小本，一个记录的是当前干的事情，另一个是等会干的事情

能使用异步的不用同步

全局对象
写代码时可以在任何地方访问
global
process 进程
buffer  缓存区

在文件中直接访问this不是global

__filename
当前文件的文件名的绝对路径
__dirname
当前文件所在的文件夹的绝对路径

全局对象，在任何地方都能够访问到，__filename,__dirname不是global的属性
文件相当于一个模块

settimeout  延迟
setImmediate 立即
立即可以让0时间的setTimeout先执行

process.nextTick
服务员的小本底下的部分，同步执行后要执行的方法

console.log(require);

