import {STAGE_HEIGHT,STAGE_WIDTH} from './global'

class Food{
    private element: HTMLElement;

    constructor(){
        // 获取页面上的food元素
        this.element = document.querySelector("#food")!

        this.init()
    }

    // 获取位置
    get X(){
        return this.element.offsetLeft
    }

    get Y(){
        return this.element.offsetTop
    }

    // 获取宽高
    get Width(){
        return this.element.offsetWidth
    }

    get Height(){
        return this.element.offsetHeight
    }

    // 初始化位置
    init(){

        const left = Math.round(Math.random() * ((STAGE_WIDTH - this.Width) / 10)) * 10
        const top = Math.round(Math.random() * ((STAGE_HEIGHT - this.Height) / 10)) * 10
        this.element.style.left =  left + "px"
        this.element.style.top =  top + "px"
    }

}

export default Food