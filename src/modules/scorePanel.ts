class ScorePanel{
    // 分数和等级
    private score: number
    private level: number

    // 最大等级
    private MAX_LEVEL: number

    // 升级间隔
    private UP_GAP: number

    // 标签
    private scoreSpan: HTMLElement
    private levelSpan: HTMLElement

    constructor(MAX_LEVEL: number = 10,UP_GAP: number = 10){
        this.score = 0
        this.level = 1
        this.MAX_LEVEL = MAX_LEVEL <= 0 ? 10 : MAX_LEVEL
        this.UP_GAP = UP_GAP <= 0 ? 10 : UP_GAP
        this.scoreSpan = document.querySelector('#score')!
        this.levelSpan = document.querySelector('#level')!
    }

    // 加分
    addScore(value : number = 1){
        this.score += value <= 0 ? 1 : value
        this.scoreSpan.innerHTML = this.score + ""
        if(this.score % this.UP_GAP === 0){
            this.levelUp()
        }
    }

    // 加等级
    private levelUp(){
        if(this.level < this.MAX_LEVEL){
            this.levelSpan.innerHTML = ++this.level + ""
        }
    }

    // 等级
    get Level(){
        return this.level
    }

    // 分数
    get Score(){
        return this.score
    }
}

export default ScorePanel