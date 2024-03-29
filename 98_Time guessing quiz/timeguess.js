"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");


let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
// let soundEndflag = "0";
let resultSound = ["sound/reset.mp3", "sound/start.mp3", "sound/stop1.mp3", "sound/stop2.mp3"];
let time;

// ボタンを"初期"状態とする
setButtonStateInitial()


////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function() {
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    w_sound = resultSound[1];
    soundControl("start", w_sound);
    startTime = Date.now();
    countUp();
  },false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function() {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime; 
    time = parseInt(stopTime);
    if(time > 10000 && time < 11000)
    {
      w_sound = resultSound[3];
      soundControl("start", w_sound);
      backgroundStop();
    }
    else
    {
      w_sound = resultSound[2];
      soundControl("start", w_sound);
       
    }
  },false
)


////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
  function() {
    // ボタンを"初期"状態とする
    setButtonStateInitial();
    w_sound = resultSound[0];
    soundControl("start", w_sound);
    backgroundReset();
    timer.textContent = "00:00.000";
   
    stopTime = 0;
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}

let w_sound
let music
function soundControl(status, w_sound) {
    if(status === "start")
    {
        music = new Audio(w_sound);
        music.currentTime == 0;
        music.play();
    }
    else if(status === "end")
    {
        music.pause();
        music.currentTime = 0;
    }
}

function backgroundStop(){
    document.body.style.background = "url(img/fireworks.gif) no-repeat";
    document.body.style.backgroundSize = "100% 100%";
    
}

function backgroundReset(){
  document.body.style.background = "rgba(233, 168, 227, 0.6)"
}
