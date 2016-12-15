/**
 * Created by Weil on 2016/10/29.
 */

let name = 'hanmeimei';
let age = 23;


let personTpl = (strArr, ...otherArr) => {
  // debugger;
  console.log(strArr, otherArr);
  return strArr[0] + otherArr[0];
};

let str = personTpl`My name is ${name}, age is ${age}`;

console.log(str);