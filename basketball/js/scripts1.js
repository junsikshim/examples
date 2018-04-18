var comScore = 0;
var userScore = 0;
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

  var textElem = document.getElementById('text');
  var comScoreElem = document.getElementById('computer-score');

  // 1/2 확률로 2점슛, 3점슛 선택
  var shootType = Math.random() < 0.5 ? 2 : 3;

  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < 0.5) {      // 1/2 확률로 성공
      textElem.innerHTML = '컴퓨터가 2점슛을 성공시켰습니다!';

      comScore += 2;
      comScoreElem.innerHTML = comScore;
    } else {                        // 실패 시
      textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
    }
  } else {                            // 3점슛이라면
    if (Math.random() < 0.33) {     // 1/3 확률로 성공
      textElem.innerHTML = '컴퓨터가 3점슛을 성공시켰습니다!';

      comScore += 3;
      comScoreElem.innerHTML = comScore;
    } else {                        // 실패 시
      textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
    }
  }

  // 컴퓨터 턴 종료
  isComputerTurn = false;
  //
  // // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = true;
  }

  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = false;
  }
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

  var textElem = document.getElementById('text');
  var userScoreElem = document.getElementById('user-score');

  if (shootType === 2) {              // 2점슛이라면
    if (Math.random() < 0.5) {      // 1/2 확률로 성공
      textElem.innerHTML = '2점슛이 성공했습니다!';

      userScore += 2;
      userScoreElem.innerHTML = userScore;
    } else {                        // 실패 시
      textElem.innerHTML = '2점슛이 실패했습니다.';
    }
  } else {                            // 3점슛이라면
    if (Math.random() < 0.33) {     // 1/3 확률로 성공
      textElem.innerHTML = '3점슛이 성공했습니다!';

      userScore += 3;
      userScoreElem.innerHTML = userScore;
    } else {                        // 실패 시
      textElem.innerHTML = '3점슛이 실패했습니다.';
    }
  }

  // 유저 턴 종료
  isComputerTurn = true;

  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++) {
    computerButtons[i].disabled = false;
  }

  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++) {
    userButtons[i].disabled = true;
  }

  // 남은 슛 횟수 감소
  shotsLeft--;

  // 남은 슛 횟수 UI 업데이트
  var shotsLeftElem = document.getElementById('shots-left');
  shotsLeftElem.innerHTML = shotsLeft;

  // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
  if (shotsLeft === 0) {
    // 승리 조건 비교
    if (userScore > comScore)
      textElem.innerHTML = '승리했습니다!';
    else if (userScore < comScore)
      textElem.innerHTML = '아쉽게도 졌습니다...';
    else
      textElem.innerHTML = '비겼습니다.';

    // 모든 버튼 비활성화
    var computerButtons = document.getElementsByClassName('btn-computer');

    for (var i = 0; i < computerButtons.length; i++) {
      computerButtons[i].disabled = true;
    }

    var userButtons = document.getElementsByClassName('btn-user');

    for (var i = 0; i < userButtons.length; i++) {
      userButtons[i].disabled = true;
    }
  }
}