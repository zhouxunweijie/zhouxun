let o1 = {a: 'a1'};
let o2 = {b: 'b2'};
let o3 = {a: 'a3'};

// let o4 = Object.assign(o1, o2, o3);

// let o1Clone = Object.assign({}, o1);
let o1Clone = o1;
o1Clone.x = 'x';
console.log(o1, o1Clone);

function Person () {

}

Object.assign(Person.prototype, {
  eat () {

  },
  sleep () {

  }
});


