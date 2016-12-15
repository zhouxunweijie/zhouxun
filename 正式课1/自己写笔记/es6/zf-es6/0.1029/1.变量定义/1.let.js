/**
 * Created by Weil on 2016/10/29.
 */
// var 的问题
"use strict";

// if ( true ) {
//   // let a = 'a';
//   // window.a = 'a';
//   // a = 'a';
//   let a = 'a';
//   console.log(a);
// }
//
// console.log(window.a);

// for ( var i = 0; i < 3; i++ ) {
//   ;(function (i) {
//     setTimeout(function () {
//       console.log(i);
//     }, 100);
//   })(i);
// }

// for ( let i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, 100);
// }

for ( let i = 0; i < 2; i++ ) {
  for ( let i = 0; i < 3; i++ ) {
    console.log(i);
  }
}

{
  let x = 'x';
}










