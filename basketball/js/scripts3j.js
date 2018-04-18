var comScore = 0;
var userScore = 0;
var isComputerTurn = true;
var shotsLeft = 15;

function onComputerShoot() {
  if (shotsLeft === 0)
    return;

  if (!isComputerTurn)
    return;

  var $textElem = $('#text');
  var $comScoreElem = $('#computer-score');

  var shootType = Math.random() < 0.5 ? 2 : 3;

  if (shootType === 2) {
    if (Math.random() < 0.5) {
      $textElem.html('컴퓨터가 2점슛을 성공시켰습니다!');

      comScore += 2;
      $comScoreElem.html(comScore);
    } else {
      $textElem.html('컴퓨터가 2점슛을 실패했습니다.');
    }
  } else {
    if (Math.random() < 0.33) {
      $textElem.html('컴퓨터가 3점슛을 성공시켰습니다!');

      comScore += 3;
      $comScoreElem.html(comScore);
    } else {
      $textElem.html('컴퓨터가 3점슛을 실패했습니다.');
    }
  }

  isComputerTurn = false;

  $('.btn-computer').prop('disabled', true);
  $('.btn-user').prop('disabled', false);
}

function onUserShoot(shootType) {
  if (shotsLeft === 0)
    return;

  if (isComputerTurn)
    return;

  var $textElem = $('#text');
  var $userScoreElem = $('#user-score');

  if (shootType === 2) {
    if (Math.random() < 0.5) {
      $textElem.html('2점슛이 성공했습니다!');

      userScore += 2;
      $userScoreElem.html(userScore);
    } else {
      $textElem.html('2점슛이 실패했습니다.');
    }
  } else {
    if (Math.random() < 0.33) {
      $textElem.html('3점슛이 성공했습니다!');

      userScore += 3;
      $userScoreElem.html(userScore);
    } else {
      $textElem.html('3점슛이 실패했습니다.');
    }
  }

  isComputerTurn = true;

  $('.btn-computer').prop('disabled', false);
  $('.btn-user').prop('disabled', true);

  shotsLeft--;

  $('#shots-left').html(shotsLeft);

  if (shotsLeft === 0) {
    if (userScore > comScore)
      $textElem.html('승리했습니다!');
    else if (userScore < comScore)
      $textElem.html('아쉽게도 졌습니다...');
    else
      $textElem.html('비겼습니다.');

    $('.btn-computer').prop('disabled', true);
    $('.btn-user').prop('disabled', true);
  }
}