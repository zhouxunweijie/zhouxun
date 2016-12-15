// 把类数组转成数组 复制数组
let arr = [0, 1, 2];
// let arr2 = arr.slice(0);
let arr2 = Array.from(arr);
arr2.push(3);

// console.log(arr, arr2);

function func () {
  let args = Array.from(arguments);

  console.log(Array.isArray(args));
}

func();
