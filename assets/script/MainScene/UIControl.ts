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
export default class NewClass extends cc.Component {
    m_btnStart:cc.Button = null
    m_btnCreator:cc.Button = null
    m_togMusic:cc.Toggle = null
    m_togSound:cc.Toggle = null

    // onLoad () {}

    start () {
        this.init()
    }

    // update (dt) {}

    public init(){
        let rootNode = this.node.getChildByName("node_Anim")
        if(rootNode){
            let nodeStart = rootNode.getChildByName("btn_start")
            if(nodeStart){
                this.m_btnStart = nodeStart.getComponent(cc.Button)
                this.m_btnStart.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
            }

            let nodeCreator = rootNode.getChildByName("btn_creator")
            if(nodeCreator){
                this.m_btnCreator = nodeCreator.getComponent(cc.Button)
                this.m_btnCreator.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
            }

            let nodeRightTop = this.node.getChildByName("rightTop_Node")
            if(nodeRightTop){
                let nodeMusic = nodeRightTop.getChildByName("togg_music")
                if(nodeMusic){
                    this.m_togMusic = nodeMusic.getComponent(cc.Toggle)
                    this.m_togMusic.node.on('toggle', this.onToggleClicked, this)
                }

                let nodeSound = nodeRightTop.getChildByName("togg_sound")
                if(nodeSound){
                    this.m_togSound = nodeSound.getComponent(cc.Toggle)
                    this.m_togSound.node.on('toggle', this.onToggleClicked, this)
                }
            }
        }
    }

    private onButtonClicked(event){
        let name = event.currentTarget.name
        cc.log(name)
        switch(name){
            case 'btn_start':{
                cc.log('btn_start clicked')
                let self = this
                let perfab = null
                cc.loader.loadRes("../resource/perfab/savelotLayer", function(err, node){
                    cc.log(node.name)
                    perfab = cc.instantiate(node)
                })
                
                this.node.addChild(perfab)
                let moveto = cc.moveTo(0.5, cc.p(0, 0))
                perfab.runAction(moveto)
                break
            }
            case 'btn_creator':{
                cc.log('btn_creator clicked')
                break
            }
        }
    }

    private onToggleClicked(event){
        let name = event.currentTarget.name
        let toggle = event.detail

        cc.log(toggle.isChecked)
        switch(name){
            case 'togg_music':{
                cc.log('togg_music clicked')
                break
            }
            case 'togg_sound':{
                cc.log('togg_sound clicked')
                break
            }
        }
    }
}
