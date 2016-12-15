/**
 * Created by Weil on 2016/10/29.
 */
var powerEs5 = function (a) {
  return a * a;
};

// let addEs6 = (a, b) => {
//   return a + b;
// };

let powerEs6 = a => a * a;


// console.log(powerEs5(3));
// console.log(powerEs6(3));

let arr = [0, 1, 2];
// arr.forEach(function (item, index, array) {
//   console.log(item * item);
// });

arr.forEach(item => console.log(item * item));