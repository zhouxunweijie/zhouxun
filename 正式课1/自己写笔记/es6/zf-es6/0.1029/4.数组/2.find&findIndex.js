/**
 * Created by Weil on 2016/10/29.
 */
Array.prototype.map
Array.prototype.forEach
Array.prototype.filter

Array.prototype.find
Array.prototype.findIndex


// let arr = [1, 3, 7, 2];
let arr = [{x: '1'}, {x: '2'}, {x: '3'}, {x: 4}];
let find = arr.find(item => item.x === '2');
let index = arr.findIndex(item => item.x === '2');

console.log(find, index);