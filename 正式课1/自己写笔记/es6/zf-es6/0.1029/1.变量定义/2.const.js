/**
 * Created by Weil on 2016/10/29.
 */
// 定义之后就不允许修改的变量
const MAX_LEN = 140;

console.log(MAX_LEN);


{
  const MAX_LEN = 141;
  console.log(MAX_LEN);
}

console.log(MAX_LEN);