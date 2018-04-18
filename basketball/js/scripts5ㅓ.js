// 컴퓨터 플레이어 객체
var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

// 유저 플레이어 객체
var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

// 게임 객체
var game = {
    isComputerTurn: true,
    shotsLeft: 15
};

// '슛하기' 버튼 클릭 핸들러
function onComputerShoot() {
    if (game.isGameOver)
        return;

    if (game.currentTurn !== computer)
        return;

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (isShootSuccessful(computer, shootType)) {
        updateScore(computer, shootType);
    } else {
        showText("컴퓨터가 " + shootType + "점슛을 실패했습니다.");
    }

    changeTurn();
}

// '2점슛', '3점슛' 버튼 클릭 핸들러
function onUserShoot(shootType) {
    if (game.isGameOver)
        return;

    if (game.currentTurn !== user)
        return;

    if (isShootSuccessful(user, shootType)) {
        updateScore(user, shootType);
    } else {
        showText(shootType + "점슛이 실패했습니다.");
    }

    changeTurn();
}

// 입력받은 플레이어의 슛 성공 여부 판단 (성공: true, 실패: false)
function isShootSuccessful(player, shootType) {
    var rnd = Math.random();

    if (shootType === 2) {
        return rnd < player.percent2 ? true : false;
    } else {
        return rnd < player.percent3 ? true : false;
    }
}

// 점수 갱신 및 UI 업데이트
function updateScore(player, shootType) {
    player.score += shootType;

    if (player === computer) {
        showText("컴퓨터가 " + shootType + "점슛을 성공시켰습니다!");
        $("#computer-score").fadeOut(function() {
            $(this).html(player.score);
            $(this).fadeIn();
        });
    } else {
        showText(shootType + "점슛이 성공했습니다!");
        $("#user-score").fadeOut(function() {
            $(this).html(player.score);
            $(this).fadeIn();
        });
    }
}

// 각 플레이어의 턴 종료
function changeTurn() {
    if (game.currentTurn === computer) {
        game.currentTurn = user;

        $(".btn-computer").prop("disabled", true);
        $(".btn-user").prop("disabled", false);
    } else {
        game.userShotsLeft--;

        $("#shots-left").html(game.userShotsLeft);

        if (game.userShotsLeft === 0) {
            if (user.score > computer.score)
                showText("승리했습니다!");
            else if (user.score < computer.score)
                showText("아쉽게도 졌습니다...");
            else
                showText("비겼습니다.");

            game.isGameOver = true;

            $(".btn-computer").prop("disabled", true);
            $(".btn-user").prop("disabled", true);

            return;
        }

        game.currentTurn = computer;

        $(".btn-computer").prop("disabled", false);
        $(".btn-user").prop("disabled", true);
    }
}

// UI 메시지 업데이트
function showText(s) {
    $("#text").html(s);
}