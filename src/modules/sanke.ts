import { STAGE_HEIGHT,STAGE_WIDTH } from "./global"

class Snake{
    // 蛇头
    head: HTMLElement
    // 身体，包括蛇头
    body: HTMLCollection
    // 蛇容器
    snake: HTMLElement

    constructor(){
        this.snake = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!
        this.body = this.snake.getElementsByTagName('div')        
    }

    // 蛇头坐标
    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }

    // 蛇宽高
    get Width(){
        return this.head.offsetWidth
    }

    get Heigth(){
        return this.head.offsetHeight
    }

    // 设置蛇头位置
    set X(value: number){

        if(value === this.X){
            return
        }

        // 撞墙判断
        if(value < 0 || value >= STAGE_WIDTH){
            throw new Error("蛇撞墙了!")
        }

        // 掉头判断
        if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value){
            if(value > this.X){
                value = this.X - this.Width
            }else{
                value = this.X + this.Width
            }            
        }

        // 移动身体
        this.moveBody(value,this.Y)

        this.head.style.left = value + "px"
    }

    set Y(value: number){

        if(value === this.Y){
            return
        }

        if(value < 0 || value >= STAGE_WIDTH){
            throw new Error("蛇撞墙了!")
        }

        // 掉头判断
        if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - this.Heigth
            }else{
                value = this.Y + this.Heigth
            }
        }

        // 移动身体
        this.moveBody(this.X,value)

        this.head.style.top = value + "px"
    }

    // 增加身体
    addBody(){
        this.snake.insertAdjacentHTML("beforeend","<div></div>")
    }

    // 身体移动
    moveBody(curX:number,curY:number){
        for(let i = this.body.length-1;i>0;--i){
            const x = (this.body[i-1] as HTMLElement).offsetLeft;
            const y = (this.body[i-1] as HTMLElement).offsetTop;
            if(x === curX && y === curY){
                throw new Error("蛇撞到自己了!")
            }
            (this.body[i] as HTMLElement).style.left = x + "px";
            (this.body[i] as HTMLElement).style.top =  y + "px";
        }
    }
}

export default Snake