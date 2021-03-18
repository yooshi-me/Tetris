//オブジェクト識別用
let tetori;
//関数呼ばれたかどうか
let leftCalled = 0;
let rightCalled = 0;
let roleCalled = 0;
let canrole = 0;
let roleCalled = 0;
let downCalled = 0;
let passCalled = 0;
let passCount = 0;
//スコア
let score = 0;
let setTime = 800;
let level = 1;

//基準となる背景を描画する
function discription() {
  var canvas = document.getElementById("field");
  canvas.width = 311;
  canvas.height = 621;
  //線を書く
  for (let x = 0; x < 11; x++) {
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(x * 31, 0);
    context.lineTo(x * 31, 621);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
  }
  for (let y = 0; y < 21; y++) {
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(0, y * 31);
    context.lineTo(311, y * 31);
    if (y === 2) {
      context.strokeStyle = "red";
    } else {
      context.strokeStyle = "black";
    }
    context.lineWidth = 1;
    context.stroke();
  }
  //ゲームを開始する
  game();
}

//fieldを生成
function createField() {
  let field = new Array(10);
  for (let x = -2; x < 12; x++) {
    field[x] = new Array(20);
    for (let y = -2; y < 22; y++) {
      if (x < 0 || x > 9 || y < 0 || y > 19) {
        field[x][y] = 1;
      } else {
        field[x][y] = 0;
      }
    }
  }
  return field;
}
//盤面の状態を表すfieldを宣言
let field = createField();

//fieldを更新する
function fieldDiscription() {
  var canvas = document.getElementById("field");
  var context = canvas.getContext("2d");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      if (field[i][j] === 1) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "green";
        context.fill();
      } else if (field[i][j] === 2) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "aqua";
        context.fill();
      } else if (field[i][j] === 3) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "rgb(161, 89, 230)";
        context.fill();
      } else if (field[i][j] === 4) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "red";
        context.fill();
      } else if (field[i][j] === 5) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "blue";
        context.fill();
      } else if (field[i][j] === 6) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "rgb(231, 228, 14)";
        context.fill();
      } else if (field[i][j] === 7) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "rgb(240, 177, 6)";
        context.fill();
      } else if (field[i][j] === 0) {
        context.beginPath();
        context.rect(1 + 31 * i, 1 + 31 * j, 29, 29);
        context.fillStyle = "rgb(148, 149, 165)";
        context.fill();
      }
    }
  }
}
//左に動かす
function left() {
  leftCalled = 1;
}
//右に動かす
function right() {
  rightCalled = 1;
}
//下に動かす
function down() {
  downCalled = 1;
}
//回転させる
function role() {
  roleCalled = 1;
}
//パスする
function pass() {
  passCalled = 1;
}
//一時停止
function stop() {
  alert("再開しますか？");
}

//キーボードからの操作
window.addEventListener("keydown", handleKeydown);
function handleKeydown(event) {
  var keyCode = event.keyCode;
  if (keyCode == 39) {//右キー
    right();
  }
  if (keyCode == 37) {//左キー
    left();
  }
  if (keyCode == 38) {//上キー
    stop();
  }
  if (keyCode == 32) {//spaceキー
    role();
  }
  if (keyCode == 40) {//下キー
    down();
  }
  if (keyCode == 13) {//Enterキー
    pass();
  }
}
//消せるLineがあるか判定
function lineExi() {
  let result = [];
  let lines = 0;
  for (let i = 0; i < 20; i++) {
    j = 0;
    while (true) {
      if (field[j][i] < 1) {
        break;
      } else if (j === 9) {
        result[lines] = i;
        lines++;
        break;
      } else {
        j++;
      }
    }
  }
  return result;
}
//ゲームオーバー判定
function judge() {
  for (let i = 0; i < 10; i++) {
    if (field[i][1] > 0) {
      return false;
    }
  }
  return true;
}
//Lineを消す
function delLine(disLine) {
  //スコア加算
  let value = 50;
  for (let i = 1; i < disLine.length; i++) {
    value = value * 3;
  }
  score = score + value;
  if (score > 1999) {
    setTime = 100;
    level = "MAX";
  } else if (score > 1799) {
    setTime = 300;
    level = 6;
  } else if (score > 1499) {
    setTime = 400;
    level = 5;
  } else if (score > 899) {
    setTime = 500;
    level = 4;
  } else if (score > 599) {
    setTime = 600;
    level = 3;
  } else if (score > 299) {
    setTime = 700;
    level = 2;
  }
  //消す
  for (let i = disLine.length - 1; 0 <= i; i--) {
    for (let k = 0; k < 10; k++) {
      field[k][disLine[i]] = 0;
    }
    setTimeout("fieldDiscription()", setTime);
  }
  for (let i = disLine[0] - 1; i >= 0; i--) {
    for (let k = 0; k < 10; k++) {
      if (field[k][i] > 0) {
        field[k][i + disLine.length] = field[k][i];
        field[k][i] = 0;
      }
    }
  }
  setTimeout("fieldDiscription()", 300);
  changeDisplay();
}
//物体を表現するクラス
class Tetoris {
  constructor() {
    switch (tetori) {
      case "O":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y + 1;
        this.thirdX = x - 1;
        this.thirdY = y;
        this.lastX = x - 1;
        this.lastY = y + 1;
        this.colorNum = 1;
        this.color = "green";
        break;
      case "I":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x;
        this.thirdY = y + 1;
        this.lastX = x;
        this.lastY = y + 2;
        this.colorNum = 2;
        this.color = "aqua";
        break;
      case "T":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x - 1;
        this.thirdY = y;
        this.lastX = x + 1;
        this.lastY = y;
        this.colorNum = 3;
        this.color = "rgb(161, 89, 230)";
        break;
      case "J":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x;
        this.thirdY = y + 1;
        this.lastX = x - 1;
        this.lastY = y + 1;
        this.colorNum = 4;
        this.color = "red";
        break;
      case "L":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x;
        this.thirdY = y + 1;
        this.lastX = x + 1;
        this.lastY = y + 1;
        this.colorNum = 5;
        this.color = "blue";
        break;
      case "S":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x - 1;
        this.thirdY = y;
        this.lastX = x + 1;
        this.lastY = y - 1;
        this.colorNum = 6;
        this.color = "rgb(231, 228, 14)";
        break;
      case "Z":
        this.firstX = x;
        this.firstY = y;
        this.secondX = x;
        this.secondY = y - 1;
        this.thirdX = x - 1;
        this.thirdY = y - 1;
        this.lastX = x + 1;
        this.lastY = y;
        this.colorNum = 7;
        this.color = "rgb(240, 177, 6)";
        break;
    }
    for (let i = 0; i < canrole; i++) {
      this.moverole();
    }
  }
  moveleft() {
    this.firstX--;
    this.secondX--;
    this.thirdX--;
    this.lastX--;
  }
  moveright() {
    this.firstX++;
    this.secondX++;
    this.thirdX++;
    this.lastX++;
  }
  movedown() {
    this.firstY++;
    this.secondY++;
    this.thirdY++;
    this.lastY++;
  }
  moverole() {
    let tmp = this.secondX;
    this.secondX = this.firstX - (this.secondY - this.firstY);
    this.secondY = this.firstY + (tmp - this.firstX);
    tmp = this.thirdX;
    this.thirdX = this.firstX - (this.thirdY - this.firstY);
    this.thirdY = this.firstY + (tmp - this.firstX);
    tmp = this.lastX;
    this.lastX = this.firstX - (this.lastY - this.firstY);
    this.lastY = this.firstY + (tmp - this.firstX);
  }
}

//物体を落とす
function drop(xi, yi, check) {
  x = xi;
  y = yi;
  tetoris = new Tetoris();
  if (leftCalled === 1) {
    //左に移動する
    if (
      field[tetoris.firstX - 1][tetoris.firstY] < 1 &&
      field[tetoris.secondX - 1][tetoris.secondY] < 1 &&
      field[tetoris.thirdX - 1][tetoris.thirdY] < 1 &&
      field[tetoris.lastX - 1][tetoris.lastY] < 1
    ) {
      tetoris.moveleft();
    }
    leftCalled = 0;
  }
  if (rightCalled === 1) {
    //右に移動する
    if (
      field[tetoris.firstX + 1][tetoris.firstY] < 1 &&
      field[tetoris.secondX + 1][tetoris.secondY] < 1 &&
      field[tetoris.thirdX + 1][tetoris.thirdY] < 1 &&
      field[tetoris.lastX + 1][tetoris.lastY] < 1
    ) {
      tetoris.moveright();
    }
    rightCalled = 0;
  }
  if (downCalled === 1) {
    //下に移動する
    if (
      field[tetoris.firstX][tetoris.firstY + 2] < 1 &&
      field[tetoris.secondX][tetoris.secondY + 2] < 1 &&
      field[tetoris.thirdX][tetoris.thirdY + 2] < 1 &&
      field[tetoris.lastX][tetoris.lastY + 2] < 1
    ) {
      tetoris.movedown();
    }
    downCalled = 0;
  }
  if (roleCalled === 1) {
    if (
      field[tetoris.firstX - (tetoris.secondY - tetoris.firstY)][
        tetoris.firstY + (tetoris.secondX - tetoris.firstX)
      ] < 1 &&
      field[tetoris.firstX - (tetoris.thirdY - tetoris.firstY)][
        tetoris.firstY + (tetoris.thirdX - tetoris.firstX)
      ] < 1 &&
      field[tetoris.firstX - (tetoris.lastY - tetoris.firstY)][
        tetoris.firstY + (tetoris.lastX - tetoris.firstX)
      ] < 1
    ) {
      //回転させる
      canrole++;
      tetoris.moverole();
    }
    roleCalled = 0;
  }
  if (passCalled === 1 && passCount < 3) {
    //パスする
    passCalled = 0;
    passCount++;
    changeDisplay();
    game();
  } else {
    //ブロックの描画
    var canvas = document.getElementById("field");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.rect(1 + 31 * tetoris.firstX, 1 + 31 * tetoris.firstY, 29, 29);
    context.fillStyle = tetoris.color;
    context.fill();
    context.beginPath();
    context.rect(1 + 31 * tetoris.secondX, 1 + 31 * tetoris.secondY, 29, 29);
    context.fillStyle = tetoris.color;
    context.fill();
    context.beginPath();
    context.rect(1 + 31 * tetoris.thirdX, 1 + 31 * tetoris.thirdY, 29, 29);
    context.fillStyle = tetoris.color;
    context.fill();
    context.beginPath();
    context.rect(1 + 31 * tetoris.lastX, 1 + 31 * tetoris.lastY, 29, 29);
    context.fillStyle = tetoris.color;
    context.fill();
    //まだ下に行けるなら
    if (
      field[tetoris.firstX][tetoris.firstY + 1] < 1 &&
      field[tetoris.secondX][tetoris.secondY + 1] < 1 &&
      field[tetoris.thirdX][tetoris.thirdY + 1] < 1 &&
      field[tetoris.lastX][tetoris.lastY + 1] < 1
    ) {
      setTimeout(`fieldDiscription()`, setTime);
      setTimeout(`drop(${tetoris.firstX},${tetoris.firstY + 1},0)`, setTime);
    } else if (check === 1) {
      //動かせなくなったらfieldとして追加
      field[tetoris.firstX][tetoris.firstY] = tetoris.colorNum;
      field[tetoris.secondX][tetoris.secondY] = tetoris.colorNum;
      field[tetoris.thirdX][tetoris.thirdY] = tetoris.colorNum;
      field[tetoris.lastX][tetoris.lastY] = tetoris.colorNum;
      nextGame();
    } else {
      //一回分移動する機会を与える
      setTimeout(`fieldDiscription()`, setTime);
      setTimeout(`drop(${tetoris.firstX},${tetoris.firstY},1)`, setTime);
    }
  }
}
//１ターン分の処理
function game() {
  //盤面を描画
  fieldDiscription();
  //何を落とすか
  let rand = Math.floor(Math.random() * 7);
  //落としていく
  switch (rand) {
    case 0:
      tetori = "O";
      break;
    case 1:
      tetori = "I";
      break;
    case 2:
      tetori = "T";
      break;
    case 3:
      tetori = "J";
      break;
    case 4:
      tetori = "L";
      break;
    case 5:
      tetori = "S";
      break;
    case 6:
      tetori = "Z";
      break;
  }
  roleCalled = 0;
  roled = 0;
  setTimeout(`drop(5,1,0)`, setTime);
}
//次のターンへの準備
function nextGame() {
  setTimeout("fieldDiscription()", setTime);
  let lines = lineExi();
  if (lines.length > 0) {
    console.log(lines);
    delLine(lines);
  }
  if (judge()) {
    game();
  } else {
    alert(`GAME OVER!     Your score is ${score}`);
  }
}
//スコアとパス数の表示
function changeDisplay() {
  const t = 3 - passCount;
  document.getElementById(
    "display"
  ).innerText = `SCORE: ${score} PASS:${t} Lv:${level}`;
}
