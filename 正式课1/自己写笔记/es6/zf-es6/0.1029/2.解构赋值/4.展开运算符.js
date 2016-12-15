/**
 * Created by Weil on 2016/10/29.
 */
// 什么是运算符 + / - * ! ...
// ... 把一个线性的东西遍历出来
"use strict";

// let arr = [0, 1, 2];

// console.log(arr);
// console.log([...arr]);
// console.log(...arr);
// console.log(0, 1, 2);

function func(x, ...args) {
  // 函数的参数中不叫展开运算符，它叫rest参数
  console.log(x, args);

  // let argsCall = Array.prototype.slice.call(arguments);

  // console.log(args);
  // console.log(Array.isArray(args));
  // console.log(Array.isArray(arguments));

  // let args = [].slice.call(arguments);
  // console.log(args);
}

// func(1, 2, 3);

// 求最大值
let arr = [0, 1, 2, 5, 99, 1, 34];

// let max = Math.max.apply(null, arr);
let max = Math.max(...arr);
console.log(max);

// 合并数组
let a1 = [1, 3, 5];
let a2 = [6, 7];

// let a3 = a1.concat(a2);
let a3 = [...a1, ...a2];
console.log(a3);











