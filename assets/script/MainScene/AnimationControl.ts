// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationControl extends cc.Component {

    private static _instance:AnimationControl = null
    private m_anim

    constructor(){
        super()     //先初始化父类
        cc.log("AnimationControl 构造函数")
    }
    
    public static GetInstance():AnimationControl {
        if(AnimationControl._instance == null){
            cc.log("new AnimationControl")
            AnimationControl._instance = new AnimationControl();
            AnimationControl._instance.init()
            
        }
        return this._instance
    }

    private init():void{
        this.m_anim = cc.find("")
    }

    public PlayAnimationWithName(name:string, callback:Function) {
        if(callback){
            
        }
    }

    public PauseAnimationWithName(name:string){

    }

    public ResumeAnimationWithName(name:string){

    }

    public StopAnimationWithName(name:string){

    }

    public StopAllAnimation(){

    }
}
