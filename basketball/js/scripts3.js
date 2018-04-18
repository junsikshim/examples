var comScore = 0;
var comPercent2 = 0.5;
var comPercent3 = 0.33;

var userScore = 0;
var userPercent2 = 0.5;
var userPercent3 = 0.33;

var isComputerTurn = true;
var shotsLeft = 15;

// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
  // 게임오버 상태라면 리턴
  if (shotsLeft === 0)
    return;

  // 컴퓨터 턴이 아니라면 리턴
  if (!isComputerTurn)
    return;

  updateAI();

  // 1/2 확률로 2점슛, 3점슛 선택
  var shootType = Math.random() < 0.5 ? 2 : 3;

  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < comPercent2) {      // 1/2 확률로 성공
      showText('컴퓨터가 2점슛을 성공시켰습니다!');
      updateComputerScore(2);
    } else {                        // 실패 시
      showText('컴퓨터가 2점슛을 실패했습니다.');
    }
  } else {                            // 3점슛이라면
    if (Math.random() < comPercent3) {     // 1/3 확률로 성공
      showText('컴퓨터가 3점슛을 성공시켰습니다!');
      updateComputerScore(3);
    } else {                        // 실패 시
      showText('컴퓨터가 3점슛을 실패했습니다.');
    }
  }

  // 컴퓨터 턴 종료
  isComputerTurn = false;

  // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  disableComputerButtons(true);
  disableUserButtons(false);
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
  // // 게임오버 상태라면 리턴
  if (shotsLeft === 0)
    return;
  //
  // 컴퓨터 턴이라면 리턴
  if (isComputerTurn)
    return;

  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < userPercent2) {      // 1/2 확률로 성공
      showText('2점슛이 성공했습니다!');
      updateUserScore(2);
    } else {                        // 실패 시
      showText('2점슛이 실패했습니다.');
    }
  } else {                            // 3점슛이라면
    if (Math.random() < userPercent3) {     // 1/3 확률로 성공
      showText('3점슛이 성공했습니다!');
      updateUserScore(3);
    } else {                        // 실패 시
      showText('3점슛이 실패했습니다.');
    }
  }

  // 유저 턴 종료
  isComputerTurn = true;

  disableComputerButtons(false);
  disableUserButtons(true);

  // 남은 슛 횟수 감소
  shotsLeft--;

  // 남은 슛 횟수 UI 업데이트
  var shotsLeftElem = document.getElementById('shots-left');
  shotsLeftElem.innerHTML = shotsLeft;

  // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
  if (shotsLeft === 0) {
    // 승리 조건 비교
    if (userScore > comScore)
      showText('승리했습니다!');
    else if (userScore < comScore)
      showText('아쉽게도 졌습니다...');
    else
      showText('비겼습니다.');

    // 모든 버튼 비활성화
    disableComputerButtons(true);
    disableUserButtons(true);
  }
}

function showText(s) {
  var textElem = document.getElementById('text');
  textElem.innerHTML = s;
}

function updateComputerScore(score) {
  comScore += score;

  var comScoreElem = document.getElementById('computer-score');
  comScoreElem.innerHTML = comScore;
}

function updateUserScore(score) {
  userScore += score;

  var userScoreElem = document.getElementById('user-score');
  userScoreElem.innerHTML = userScore;
}

function disableComputerButtons(flag) {
  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = flag;
  }
}

function disableUserButtons(flag) {
  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = flag;
  }
}

function updateAI() {
  var diff = userScore - comScore;

  if (diff >= 10) {
    comPercent2 = 0.7;
    comPercent3 = 0.43;
  } else if (diff >= 6) {
    comPercent2 = 0.6;
    comPercent3 = 0.38;
  } else if (diff <= -10) {
    comPercent2 = 0.3;
    comPercent3 = 0.23;
  } else if (diff <= -6) {
    comPercent2 = 0.4;
    comPercent3 = 0.28;
  }
}