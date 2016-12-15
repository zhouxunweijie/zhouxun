## angular怎么用
- 处理数据，前后端分离框架（MVVM），双向数据绑定，扩展标签的功能，模块化，单页开发，

## ng-app（html）
- 启动angular程序，直接指定模块来启动，定义模块。调用 run方法，产生$rootScope
## ns-model
- 只能放置变量，不能够放变量
- 用于表单元素
- 如果作用于上没有，则声明
- 如果有去取值就放在输入框中
- 如果使用user.name 则会创建一个对象，将name变成一个变量存进来
## ng-bind
- 和{{}}相同，ng-bind不会闪烁
- 不能用于表单元素
- 可以使用！/？
- 原有的内容会被ng-bind绑定的值替换掉
##ng-cloak
- 用途：防止闪烁
- 先声明一个css，找到所有带有ng-cloak让其隐藏
- 增加到需要防止闪烁的元素的身上
- 加载后移除掉ng-cloak属性
## ng-controller
用途：调用数据的

- 不能操作dom,dom在link函数中操作
- 管辖范围，和dom平齐
- 可以将带有ng-controller的标签嵌套，子继承父 父不能继承子，
- 不能复用
- 调用ng-controller后可以执行控制器
## ng-repeat
用途：循环遍历

- 要循环谁就写在谁的 身上
- 遍历数组 ng中增加的属性$index $odd $even $first $last $middle(根据索引来遍历数组)
- 通过（key,value）可以获得索引，默认写一个变量则是value
- 对象同数组
- 如果value重复，不能通过相同的value去遍历，通过唯一项来进行遍历，只要是数组就加 trank by $index
## ng-show/ng-hide
用途：控制元素的显示隐藏

- 通过CSS样式进行隐藏

> 频繁切换采用ng-show/ng-hide

## ng-click
- angular事件 ng-click='fn()'

## ng-if
用途：控制元素的显示隐藏

- 通过删除dom达到隐藏效果，如果为false内部指令不再执行了
- 会产生一个作用域，保留删掉的部分

> 一般和ng-repeat连用，如果数据不存在就移除掉dom元素

- 通过删除dom元素的标签达到隐藏的效果，如果为false内部指令不再执行

## ng-disabled
用途：ng-disadled='true' 进入禁用状态

## ng-readonly
用途：ng-readonly='true' 进入仅读状态

## 指令（内置，自定义）
- 自定义：组件式和装饰性；
   - 组件式：Element ,看有没有template
   - 装饰型：Attribute,一般没有模板 link函数
   
~~~
return{
    restrict:'EA', 限制使用范围
    trmplate/templateUrl, 模板
    transclude:true, 保留指令中原来保留的部分，将ng-transclued放在模板标签当中
    scope:true/{}/不写，引入的函数传递参数必须使用对象格式
    replace：true，是否替换外层标签
    link：function(scope,element,attrs){ 链接函数
        scope:当前作用域，如果自己家没有就往上找，对象中取得的都是对应的属性
        element：当前指令所在的元素
        attrs:是当前指令所有的属性集合
    
    }
}
~~~


- 先写好内容
- 创建分支
~~~
git checkout -b gh-pages   
~~~
- 链接远程仓库
~~~
git remote add cc 地址
~~~
- 推送
~~~
gitpush  cc  gh-pages
~~~





