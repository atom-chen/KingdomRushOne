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
export default class MainLayerAnimationControl extends cc.Component {

    private m_anim: cc.Animation = null
    private m_animState:cc.AnimationState[] = []

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.init()

        let state = this.m_anim.play("logoScaleAnim")
        this.m_anim.on('finished', this.AnimationComplate, this)
    }

    // update (dt) {}

    public init(){
        let node_Anim = this.node.getChildByName("node_Anim")
        if(node_Anim){
            this.m_anim = node_Anim.getComponent(cc.Animation)
        }
    }

    public AnimationComplate(event){
        let name = event.currentTarget.name
        cc.log(name)
        switch(name){
            case 'logoScaleAnim':{
                this.m_anim.play("startBtnAnim")
                break
            }
            case 'logoLightAnim':{
                let state = this.m_anim.play("logoLightAnim")
                state.delay = 3
                break
            }
            case 'startBtnAnim':{
                this.m_anim.play("creatorBtnAnim")
                this.m_anim.on('finished', this.AnimationComplate, this)
                break
            }
            case 'creatorBtnAnim':{
                let state = this.m_anim.play("logoLightAnim")
                state.delay = 3
                break
            }
        }
    }
}
