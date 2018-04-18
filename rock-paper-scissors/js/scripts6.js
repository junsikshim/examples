var SCISSORS = '가위';
var ROCK = '바위';
var PAPER = '보';

// '가위', '바위', '보' 버튼 클릭 핸들러
function onButtonClick(userInput) {
  var comInput;
  var rnd = Math.random();

  if (rnd < 0.33) {
    comInput = SCISSORS;
  } else if (rnd < 0.66) {
    comInput = ROCK;
  } else {
    comInput = PAPER;
  }

  var result = '컴퓨터: ' + comInput;

  if (userInput === SCISSORS) {
    if (comInput === SCISSORS) {
      result += ' - 비겼습니다.';
    } else if (comInput === ROCK) {
      result += ' - 졌습니다...';
    } else {
      result += ' - 이겼습니다!!';
    }
  } else if (userInput === ROCK) {
    if (comInput === SCISSORS) {
      result += ' - 이겼습니다!!';
    } else if (comInput === ROCK) {
      result += ' - 비겼습니다.';
    } else {
      result += ' - 졌습니다...';
    }
  } else {
    if (comInput === SCISSORS) {
      result += ' - 졌습니다...';
    } else if (comInput === ROCK) {
      result += ' - 이겼습니다!!';
    } else {
      result += ' - 비겼습니다.';
    }
  }

  alert(result);
}
