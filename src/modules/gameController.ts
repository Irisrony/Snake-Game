import Snake from './sanke'
import Food from './food'
import ScorePanel from './scorePanel'

class GameController{
    // 蛇
    snake: Snake
    // 食物
    food : Food
    // 计分区域
    scorePanel: ScorePanel

    // 移动方向（按键方向）
    direction: string

    // 方向map
    directionMap: Map<string,[number,number]> 
    
    // 移动时间间隔
    maxTime: number = 300
    minTime: number = 100
    perTime: number = 30

    // 游戏是否结束
    isAlive: boolean = true

    // 每次加分
    perScore: number = 5

    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()

        this.direction = ''
        this.directionMap = new Map([
            ["ArrowUp",[0,-this.snake.Heigth]],["Up",[0,-this.snake.Heigth]],
            ["ArrowDown",[0,this.snake.Heigth]],["Down",[0,this.snake.Heigth]],
            ["ArrowLeft",[-this.snake.Width,0]],["Left",[-this.snake.Width,0]],
            ["ArrowRight",[this.snake.Width,0]],["Right",[this.snake.Width,0]]
        ])

        this.init()
    }

    init(){
        // 绑定按键事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        // 运动方法
        this.run()
    }

    // 按下响应
    keydownHandler(e: KeyboardEvent){        
        if(this.directionMap.has(e.key)){
            this.direction = e.key
        }
    }

    // 蛇移动
    run(){

        if(this.directionMap.has(this.direction)){
            let [x,y] = [this.snake.X,this.snake.Y]
            
            // 当前方向速度
            const [vx,vy] = this.directionMap.get(this.direction)!

            x += vx
            y += vy

            try {
                // 判断是否吃到食物
                this.checkEat()
                // 移动
                this.snake.X = x
                this.snake.Y = y
            } catch (error : any) {
                alert(error.message + `Game Over! 您的得分是：${this.scorePanel.Score}`)
                this.isAlive = false
            }
        }

        // 定时调用
        this.isAlive && setTimeout(this.run.bind(this),Math.max(this.minTime,this.maxTime - (this.scorePanel.Level - 1) * this.perTime))

    }

    // 吃到食物
    checkEat(){
        if(this.snake.X === this.food.X && this.snake.Y === this.food.Y){
            // 重置食物位置
            this.food.init()
            // 增加分数
            this.scorePanel.addScore(this.perScore)
            // 增加一节身体
            this.snake.addBody()
        }
    }
}

export default GameController