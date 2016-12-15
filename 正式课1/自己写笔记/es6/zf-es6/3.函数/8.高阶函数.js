let func = a => b => c => a + b + c;
//
let func2 = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    }
  }
};

let func3 = function (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
};

//console.log(func(1)(4)(7));
console.log(func2(1)(4)(7));
console.log(func3(1)(4)(7));