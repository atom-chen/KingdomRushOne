import LayerManager from "../../LayerManager"
import Utils from "../../utils"
const {ccclass, property} = cc._decorator;

enum BtnTag{
    BTN_TAG_SAVELOT_BEGIN = 100,
    BTN_TAG_SAVELOT_1,
    BTN_TAG_SAVELOT_2,
    BTN_TAG_SAVELOT_3,
    BTN_TAG_CLOSE,
    BTN_TAG_ITEM_BEGIN = 200,
    BTN_TAG_ITEM_1,
    BTN_TAG_ITEM_2,
    BTN_TAG_ITEM_3,
}

@ccclass
export default class SavelotLayer extends cc.Component {
    m_animation:cc.Animation = null
    m_btnClose:cc.Button = null
    m_btnNewItem:cc.Button[] = []
    m_starNum:number[] = []
    m_starTotal:number[] = []
    m_slotName:string[] = []
    m_isNewSlot:boolean[] = []

    m_labName:cc.Node[] = []
    m_labStar:cc.Node[] = []
    m_sprStar:cc.Node[] = []
    m_btnItemClose:cc.Node[] = []

    @property(Number)
    btnNewItemNum:number = 0

    // onLoad () {}

    start () {
        this.init()
        this.initConfig()
    }

    // update (dt) {}

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEventEnded, this)

        cc.loader.release("perfab/savelotLayer")
    }


    onTouchEventEnded(event){
    }

    onButtonClicked(event){
        let tag = event.currentTarget.tag
        switch(tag){
            case BtnTag.BTN_TAG_SAVELOT_1:case BtnTag.BTN_TAG_SAVELOT_2:case BtnTag.BTN_TAG_SAVELOT_3:{
                let index = tag % BtnTag.BTN_TAG_SAVELOT_BEGIN
                if(this.m_isNewSlot[index-1]){
                    cc.log("已有存档，进入关卡层")
                }else{
                    let data = {
                        star:0,
                        starTotal:65,
                        labelString:"关卡 "+index
                    }

                    Utils.writeStorage("slot_"+index, data)
                    this.m_isNewSlot[index-1] = true
                    cc.log("新建存档，进入关卡层")
                }
                
                cc.log("New item Clicked")
                break
            }
            case BtnTag.BTN_TAG_CLOSE:{
                cc.log("关闭按钮被点击")
                this.node.removeAllChildren(true)
                this.node.destroy()
            }
            case BtnTag.BTN_TAG_ITEM_1:case BtnTag.BTN_TAG_ITEM_2:case BtnTag.BTN_TAG_ITEM_3:{
                cc.log("子项关闭按钮被点击")
                let index = tag % BtnTag.BTN_TAG_ITEM_BEGIN
                Utils.deleteStorage("slot_"+index)
                this.m_isNewSlot[index-1] = false
                break
            }
        }
    }

    init(){
        let layout = this.node.getChildByName("layout")
        if(layout){
            for(let i = 0; i < this.btnNewItemNum; ++i){
                let nodeItem = layout.getChildByName("btn_savelot_"+(i+1))
                if(nodeItem){
                    let btn = nodeItem.getComponent(cc.Button)
                    btn.node.tag = BtnTag.BTN_TAG_SAVELOT_BEGIN + (i + 1)
                    btn.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
                    this.m_btnNewItem.push(btn)

                    let labName = nodeItem.getChildByName("Label")
                    if(labName){
                        this.m_labName[i] = labName
                    }

                    let nodeStar = nodeItem.getChildByName("lab_star")
                    if(nodeStar){
                        this.m_labStar[i] = nodeStar
                    }

                    let nodeBtnItem = nodeItem.getChildByName("btn_close")
                    if(nodeBtnItem){
                        this.m_btnItemClose[i] = nodeBtnItem
                        this.m_btnItemClose[i].getComponent(cc.Button).node.tag = BtnTag.BTN_TAG_ITEM_BEGIN + (i+1)
                        this.m_btnItemClose[i].getComponent(cc.Button).node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
                    }

                    let nodeStarIcon = nodeItem.getChildByName("icon_star")
                    if(nodeStarIcon){
                        this.m_sprStar[i] = nodeStarIcon
                    }
                    
                }
            }
        }

        let nodeClose = this.node.getChildByName("btn_close")
        if(nodeClose){
            this.m_btnClose = nodeClose.getComponent(cc.Button)
            this.m_btnClose.node.tag = BtnTag.BTN_TAG_CLOSE
            this.m_btnClose.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
        }

        this.m_animation = this.getComponent(cc.Animation)
        if(this.m_animation){
            this.m_animation.play("savelotLayerAnim")
        }

        this.node.width = cc.director.getVisibleSize().width
        this.node.height = cc.director.getVisibleSize().height
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEventEnded, this)
    }

    initConfig(){
        for(let i = 0; i < this.btnNewItemNum; ++i){
            let data = Utils.readStorage("slot_"+(i+1))
            cc.log(data)
            if(data){
                this.m_starNum[i] = data.star
                this.m_starTotal[i] = data.starTotal
                this.m_slotName[i] = data.labelString

                this.m_labName[i].getComponent(cc.Label).string = this.m_slotName[i]
                this.m_labStar[i].getComponent(cc.Label).string = this.m_starNum[i] + " / " + this.m_starTotal[i]
                
                if(this.m_labName[i].y == 0){
                    this.m_labName[i].y = this.m_labName[i].y + 20
                }

                this.m_labStar[i].active = true
                this.m_sprStar[i].active = true
                this.m_btnItemClose[i].active = true
                this.m_isNewSlot[i] = true
            }else{
                this.m_labStar[i].active = false
                this.m_sprStar[i].active = false
                this.m_btnItemClose[i].active = false
                this.m_isNewSlot[i] = false
                this.m_labName[i].getComponent(cc.Label).string = "新游戏"
                this.m_labStar[i].getComponent(cc.Label).string = 0 + " / " + 0
                if(this.m_labName[i].y == 20){
                    this.m_labName[i].y = 0
                }
            }
            
        }
    }
}
