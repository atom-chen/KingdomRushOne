import LayerManager from "../../LayerManager"

const {ccclass, property} = cc._decorator;

enum BtnTag{
    BTN_TAG_LV_BEGIN = 300
}
@ccclass
export default class Customs extends cc.Component {
    m_btnLv:cc.Button[] = []
    m_layerManager:LayerManager = null
    // onLoad () {}

    start () {
        this.m_layerManager = LayerManager.GetInstance()
        this.initBtnLv()
    }

    // update (dt) {}

    initBtnLv(){
        let nodeCustom = this.node.getChildByName("btn_custom_1")
        if(nodeCustom){
            let btnCustom = nodeCustom.getComponent(cc.Button)
            btnCustom.node.tag = BtnTag.BTN_TAG_LV_BEGIN + 1
            btnCustom.node.on(cc.Node.EventType.TOUCH_END, this.onBtnClicked, this)
            this.m_btnLv.push(btnCustom)
        }
    }

    onBtnClicked(event){
        let tag = event.currentTarget.tag
        switch(tag){
            case BtnTag.BTN_TAG_LV_BEGIN+1:{
                this.m_layerManager.ReplaceLayer("perfab/layer/customInfoLayer", this.node.parent.parent)
                break
            }
        }
    }
}
