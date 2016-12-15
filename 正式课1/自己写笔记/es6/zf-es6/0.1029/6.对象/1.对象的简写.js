let name = 'xiaoming';
let age = 12;

var obj5 = {
  name: name,
  age: age,
  func: function () {

  }
};

let obj6 = {
  name,
  age,
  func () {

  }
};

function Pserson (personId) {
  let name = 'xiaoming';
  let age = 12;

  return { name, age };
}

console.log(obj5, obj6);