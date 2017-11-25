var isComputerTurn = true;
var comScore = 0;
var userScore = 0;
var userShotsLeft = 15;
var isGameOver = false;

// 이벤트 핸들러 등록
document.getElementById('btn-computer').onclick = onComputerShoot;

document.getElementById('btn-2point').onclick = function() {
    onUserShoot(2);
};

document.getElementById('btn-3point').onclick = function() {
    onUserShoot(3);
};

// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
    // 게임오버 상태라면 리턴
    if (isGameOver)
        return;

    // 컴퓨터 턴이 아니라면 리턴
    if (!isComputerTurn)
        return;

    // 1/2 확률로 2점슛, 3점슛 선택
    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (shootType === 2) {              // 2점슛이라면
        if (Math.random() < 0.5) {      // 1/2 확률로 성공
            document.getElementById('text').innerHTML = '컴퓨터가 2점슛을 성공시켰습니다!';
            comScore += 2;
            document.getElementById('computer-score').innerHTML = comScore;
        } else {                        // 실패 시
            document.getElementById('text').innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
        }
    } else {                            // 3점슛이라면
        if (Math.random() < 0.33) {     // 1/3 확률로 성공
            document.getElementById('text').innerHTML = '컴퓨터가 3점슛을 성공시켰습니다!';
            comScore += 3;
            document.getElementById('computer-score').innerHTML = comScore;
        } else {                        // 실패 시
            document.getElementById('text').innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
        }
    }

    // 컴퓨터 턴 종료
    isComputerTurn = false;

    // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
    document.getElementById('btn-computer').disabled = true;
    for (var i = 0; i < 2; i++) {
        document.getElementsByClassName('btn-user')[i].disabled = false;
    }
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
    // 게임오버 상태라면 리턴
    if (isGameOver)
        return;

    // 컴퓨터 턴이라면 리턴
    if (isComputerTurn)
        return;

    if (shootType === 2) {              // 2점슛이라면
        if (Math.random() < 0.5) {      // 1/2 확률로 성공
            document.getElementById('text').innerHTML = '2점슛이 성공했습니다!';
            userScore += 2;
            document.getElementById('user-score').innerHTML = userScore;
        } else {                        // 실패 시
            document.getElementById('text').innerHTML = '2점슛이 실패했습니다.';
        }
    } else {                            // 3점슛이라면
        if (Math.random() < 0.33) {     // 1/3 확률로 성공
            document.getElementById('text').innerHTML = '3점슛이 성공했습니다!';
            userScore += 3;
            document.getElementById('user-score').innerHTML = userScore;
        } else {                        // 실패 시
            document.getElementById('text').innerHTML = '3점슛이 실패했습니다.';
        }
    }

    // 남은 슛 횟수 감소
    userShotsLeft--;

    // 남은 슛 횟수 UI 업데이트
    document.getElementById('shots-left').innerHTML = userShotsLeft;

    // 만약 남은 슛 횟수가 0이라면, 즉 게임 종료라면
    if (userShotsLeft === 0) {
        // 승리 조건 비교
        if (userScore > comScore)
            document.getElementById('text').innerHTML = '승리했습니다!';
        else if (userScore < comScore)
            document.getElementById('text').innerHTML = '아쉽게도 졌습니다...';
        else
            document.getElementById('text').innerHTML = '비겼습니다.';

        // 게임오버 상태로 변경
        isGameOver = true;

        // 모든 버튼 비활성화
        document.getElementById('btn-computer').disabled = true;
        for (var i = 0; i < 2; i++) {
            document.getElementsByClassName('btn-user')[i].disabled = true;
        }

        return;
    }

    // 유저 턴 종료
    isComputerTurn = true;

    // 컴퓨터 버튼 활성화 및 유저 버튼 비활성화
    document.getElementById('btn-computer').disabled = false;
    for (var i = 0; i < 2; i++) {
        document.getElementsByClassName('btn-user')[i].disabled = true;
    }
}