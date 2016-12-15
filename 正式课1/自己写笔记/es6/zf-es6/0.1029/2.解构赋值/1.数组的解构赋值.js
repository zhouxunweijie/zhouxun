// let arr = [0, 1, 2];

// es5
// let a1 = arr[0];
// let a2 = arr[1];
// let a3 = arr[2];
// let a4 = arr[3];

// es6 等同于上面的写法
// 右边是数组，左边就构造一个类似于右边的结构
// let [a1, , a3] = arr;

// 数组的解构赋值超出范围的是undefined
// 在范围内省略的可以用, 代替

// console.log(a1, a3);

// 数组的嵌套赋值
let arr = [0, [1.1, 1.2], 2];
let [ a0, [a1_1, a1_2], a2 ] = arr;

console.log(a0, a1_1, a1_2, a2 );


















