// 左侧 构造一个和 右侧 数据结构类似的东西

"use strict";

let obj = {
  name: 'xiaoming',
  age: '21',
};

// let objArr = {
//   0: 0,
//   1: 1,
// };

// let o1 = obj.o1;
// let o2 = obj.o2;
// 对象解构赋值改名
let { name: my_name, age: my_age } = obj;
console.log(my_name, my_age);

// function func (userData) {
//   let { name, age, sex } = userData;
//
//   console.log(name);
//   console.log(userData.name);
// }