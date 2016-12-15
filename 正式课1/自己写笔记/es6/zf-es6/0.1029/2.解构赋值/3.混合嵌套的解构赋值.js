let obj = {
  o1: 'o1',
  arr: [
    0,
    1,
    {
      ao1: 'ao1',
      ao2: 'ao2',
      ao3: ['x', 'y', 'z']
    }
  ]
};

let {
  o1,
  arr: [
    a1,
    a2,
    {
      ao1: aObj1,
      ao2: aObj2,
      ao3: [ao3_1, ao3_2, ao3_3]
    }
  ]
} = obj;

console.log(o1, a1, a2, aObj1, aObj2, ao3_1, ao3_2, ao3_3);