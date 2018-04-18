var SCISSORS = '가위';
var ROCK = '바위';
var PAPER = '보';

var userInput = prompt('가위, 바위, 보!');

if (userInput !== SCISSORS && userInput !== ROCK && userInput !== PAPER) {
  alert('가위, 바위, 보 중 하나를 입력해야 합니다!');
} else {
  var comInput;

  // Math.random()은 0부터 1 사이의 임의의 값을 리턴함
  var rnd = Math.random();

  if (rnd < 0.33) {               // 0에서 0.33 사이의 값, 즉 1/3 확률
    comInput = SCISSORS;
  } else if (rnd < 0.66) {        // 0.33에서 0.66 사이의 값, 즉 1/3 확률
    comInput = ROCK;
  } else {                        // 0.66에서 1 사이의 값, 즉 1/3 확률
    comInput = PAPER;
  }

  if (userInput === SCISSORS) {
    if (comInput === SCISSORS) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
    } else if (comInput === ROCK) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
    } else {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
    }
  } else if (userInput === ROCK) {
    if (comInput === SCISSORS) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
    } else if (comInput === ROCK) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
    } else {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
    }
  } else {
    if (comInput === SCISSORS) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터에게 졌습니다...');
    } else if (comInput === ROCK) {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터를 이겼습니다!!');
    } else {
      alert('컴퓨터: ' + comInput + ' - 컴퓨터와 비겼습니다.');
    }
  }
}