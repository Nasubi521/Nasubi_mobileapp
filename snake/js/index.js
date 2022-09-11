
const snake = document.getElementById("snake")

// 获取蛇的各个部分
const snakes = snake.getElementsByTagName("div")


//获取食物
const food = document.getElementById("food")

//获取分数和level
const scoreSpan = document.getElementById("score")
const LevelSpan = document.getElementById("level")

let score = 0
let level = 0

// 食物的坐标应选在0-290之间
function changeFood(){
    //生成0-29之间的随机数
    const x = Math.floor(Math.random() * 30) * 10
    const y = Math.floor(Math.random() * 30) * 10

    //设置食物的坐标
    food.style.left = x + "px"
    food.style.top = y + "px"
}

changeFood()

//定义一个变量用来存储蛇的移动方向
let dir
// 判断是否同时按下两个键
let keyActive = true

const keyArr = ["ArrowUp","ArrowDown","ArrowRight","ArrowLeft",]

// 创建一个对象
const reObj = {
    ArrowUp:"ArrowDown",
    ArrowDown:"ArrowUp",
    ArrowRight:"ArrowLeft",
    ArrowLeft:"ArrowRight"
}

// 游戏禁止调头
document.addEventListener("keydown",(event) =>{
    // console.log(event.key)
    if(keyActive == true && keyArr.includes(event.key))
    {
        //判断长度是否为1
        if(snakes.length < 2 || reObj[dir] !== event.key)
        {
            //设置方向
            dir = event.key
            keyActive = false
        }
        // else
        // {
        //     // 判断蛇是否调头
        //     // if(dir === "ArrowUp" && event.key !== "ArrowDown")
        //     // {
        //     //     dir = event.key
        //     // }
        //     // else if(dir === "ArrowDown" && event.key !== "ArrowUp")
        //     // {
        //     //     dir = event.key
        //     // }
            
        //     // else if(dir === "ArrowLeft" && event.key !== "ArrowRight")
        //     // {
        //     //     dir = event.key
        //     // }
        //     // else if(dir === "ArrowRight" && event.key !== "ArrowLeft")
        //     // {
        //     //     dir = event.key
        //     // }

        // }
        
    }
    
//    switch(event.key){
//     case "ArrowUp":
//         // console.log(1);
//         head.style.top = head.offsetTop - 10 + "px"
//         break
//     case "ArrowDown":
//         // console.log(2);
//         head.style.top = head.offsetTop + 10 + "px"
//         break
//     case "ArrowLeft":
//         // console.log(3);
//         head.style.left = head.offsetLeft - 10 + "px"
//         break
//     case "ArrowRight":
//         // console.log(4);
//         head.style.left = head.offsetLeft + 10 + "px"
//         break
// }
})
//蛇自动移动和解决长按卡顿问题
setTimeout(function move(){
    //获取头部
    const head = snakes[0]
    // 获取蛇头的坐标
    let x = head.offsetLeft
    let y = head.offsetTop

    switch(dir){
        case "ArrowUp":
            // 向上移动
            // console.log(1);
            // head.style.top = head.offsetTop - 10 + "px"
            y -= 10
            break
        case "ArrowDown":
            // console.log(2);
            // head.style.top = head.offsetTop + 10 + "px"
            y += 10
            break
        case "ArrowLeft":
            // console.log(3);
            // head.style.left = head.offsetLeft - 10 + "px"
            x -= 10
            break
        case "ArrowRight":
            // console.log(4);
            // head.style.left = head.offsetLeft + 10 + "px"
            x += 10
            break
    }

    //检查蛇是否吃到食物
    if(
        head.offsetTop === food.offsetTop &&
        head.offsetLeft === food.offsetLeft
    ){
       //1.改变食物位置
       changeFood()
       //2.改变蛇的长度
       snake.insertAdjacentHTML("beforeend","<div/>")

       //分数
       score++
       scoreSpan.textContent = score

       //等级
       if(score % 3 === 0 && level < 14) 
       {
           level++
           LevelSpan.textContent = level + 1
       }
    }
    
    // 判断是否撞墙
    if(x < 0 || x > 290 || y < 0 || y > 290)
    {
        alert("GAME OVER !!!!!")
        return
    }

    // 判断是否撞到自己
    for(let i = 0; i < snakes.length - 1; i++){
        if(
            snakes[i].offsetLeft === x &&
            snakes[i].offsetTop === y
        )
        {
            alert("GAME OVER !!!!!")
            return
        }
    }

    // 获取尾巴
    const tail = snakes[snakes.length - 1]
    // 移动蛇的位置
    tail.style.left = x + "px"
    tail.style.top = y + "px"
    // 将尾巴移动到蛇头的位置
    snake.insertAdjacentElement("afterbegin",tail)
    keyActive = true


    setTimeout(move,300 - level * 20)
},300)

