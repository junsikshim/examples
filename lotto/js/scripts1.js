// 6개의 숫자를 넣을 변수들
var num1, num2, num3, num4, num5, num6;


num1 = Math.floor(Math.random() * 45 + 1);

num2 = Math.floor(Math.random() * 45 + 1);

while (num2 === num1) {
  num2 = Math.floor(Math.random() * 45 + 1);
}

num3 = Math.floor(Math.random() * 45 + 1);

while (num3 === num1 || num3 === num2) {
  num3 = Math.floor(Math.random() * 45 + 1);
}

while (num6 === num1 || num6 === num2 || num6 === num3 || num6 === num4 || num6 === num5) {
  num6 = Math.floor(Math.random() * 45 + 1);
}