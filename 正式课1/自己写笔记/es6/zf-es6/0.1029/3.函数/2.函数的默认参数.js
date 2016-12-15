let add = (isReturn = true, a = 0, b = 0) => {
  // if ( typeof a === 'undefined') {a = 0;}
  // if ( typeof b === 'undefined') {b = 0;}
  // if ( typeof isReturn === 'undefined') {isReturn = true;}

  let sum = 0;
  sum = a + b;

  if ( isReturn ) {
    return sum;
  } else {
    console.log(sum);
  }
};

add(false, 4);













// nums.forEach(item => sum += item);