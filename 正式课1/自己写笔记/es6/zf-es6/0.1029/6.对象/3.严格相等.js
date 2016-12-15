/**
 * Created by Weil on 2016/10/29.
 */
// Object.is
// Array.isArray
// Array.prototype.slice
// ===
let arr = [1, 2];
let arr2 = [1, 2];
console.log(Object.is(JSON.stringify(arr), JSON.stringify(arr2)));