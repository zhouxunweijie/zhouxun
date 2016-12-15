/**
 * Created by Weil on 2016/10/29.
 */
'use strict';
window.a = 'a';
var o = {
  a: 'oa'
};

var obj = {
  a: 'obj_a',
  func1: function () {
    console.log(this);
    setTimeout(function () {
      console.log(this, this.a,
        this === window
      );
    }, 100);
  },
  func2: function () {
    console.log(this);
    // debugger;
    setTimeout(() => {
      console.log(this, this.a);
    }, 100);
  },
  func3: () => {
    console.log(this);
    setTimeout(() => {
      console.log(this, this.a,
        this === window
      );
    }, 100);
  }
};

// es5函数的this是在执行的时候才知道
// es6函数的this在定义的时候就知道
// 和父作用域一样
// obj.func1.call(o);
// obj.func1();
// obj.func2();
// obj.func2.call(o);
obj.func3();