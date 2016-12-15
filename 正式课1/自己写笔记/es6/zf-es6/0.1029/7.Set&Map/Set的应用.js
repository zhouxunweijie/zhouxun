// let arr = [1, 1, 3, '1', 5, 'dfsf'];

// let obj = {};
//
// for ( let i = 0; i < arr.length; i++) {
//   obj[arr[i] + '_' + typeof arr[i]] = true;
// }
//
// let newArr = [];
//
// for ( let key in obj ) {
//   newArr.push(key.split('_')[0])
// }
//
// console.log(newArr);

// 线性的东西都可以用 ... 展开运算符
// let arr = [1, 1, 3, '1', 5, 'dfsf'];
//
// let newArr1 = [...new Set([...arr])];
// let newArr2 = Array.from(new Set([...arr]));
//
// console.log(newArr1, newArr2);

// 集合操作
// 并集
// let set1 = new Set([1, 3, 5]);
// let set2 = new Set([2, 3, 6]);
// let setBj = new Set([...set1, ...set2]);
//
// console.log(setBj);

// 交集/差集
let set1 = new Set([1, 3, 5]);
let set2 = new Set([2, 3, 6]);

let setJj = new Set();

set2.forEach(item => {
  if ( !set1.has(item) ) {
    setJj.add(item);
  }
});

// Array.from(set1).filter(item => set2.has(item));

console.log(setJj);



































