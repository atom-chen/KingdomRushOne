const {ccclass, property} = cc._decorator;

enum BtnTag{
    BTN_TAG_SETTING = 200,
    BTN_TAG_ACHIEVEMENT,
    BTN_TAG_SHOP,
    BTN_TAG_LV,
    BTN_TAG_BOOK,
}

@ccclass
export default class CustomsLayer extends cc.Component {

    @property(cc.Sprite)
    background:cc.Sprite = null

    @property(cc.Node)
    nodeSetting:cc.Node = null

    m_left:number = 0
    m_right:number = 0
    m_top:number = 0
    m_bottom:number = 0
    m_visibleSize:cc.Size = null

    m_labStars:cc.Label = null
    m_labJewels:cc.Label = null

    m_btnShop:cc.Button = null
    m_btnSetting:cc.Button = null
    m_btnLv:cc.Button = null
    m_btnBook:cc.Button = null
    m_btnAchievement:cc.Button = null

    // onLoad () {}

    start () {
        this.init()
        this.initTop()
        this.initBottom()
        this.initConfig()
        this.initCustoms()
    }

    // update (dt) {}

    initTop(){
        let nodeTop = this.node.getChildByName("node_top")
        if(nodeTop){
            let nodeStars = nodeTop.getChildByName("stars_bg").getChildByName("lab_stars")
            if(nodeStars){
                this.m_labStars = nodeStars.getComponent(cc.Label)
            }

            let nodeJewels = nodeTop.getChildByName("stars_bg").getChildByName("lab_jewels")
            if(nodeJewels){
                this.m_labJewels = nodeJewels.getComponent(cc.Label)
            }
        }
    }

    initBottom(){
        let nodeBottom = this.node.getChildByName("node_bottom")
        if(nodeBottom){
            let layout =  nodeBottom.getChildByName("layout")
            if(layout){
                let nodeSetting = layout.getChildByName("btn_setting")
                if(nodeSetting){
                    this.m_btnSetting = nodeSetting.getComponent(cc.Button)
                    this.m_btnSetting.node.tag = BtnTag.BTN_TAG_SETTING
                    this.m_btnSetting.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked.bind(this), this)
                }

                let nodeAchievement = layout.getChildByName("btn_achievement")
                if(nodeAchievement){
                    this.m_btnAchievement = nodeAchievement.getComponent(cc.Button)
                    this.m_btnAchievement.node.tag = BtnTag.BTN_TAG_ACHIEVEMENT
                    this.m_btnAchievement.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked.bind(this), this)
                }

                let nodeShop = layout.getChildByName("btn_shop")
                if(nodeShop){
                    this.m_btnShop = nodeShop.getComponent(cc.Button)
                    this.m_btnShop.node.tag = BtnTag.BTN_TAG_SHOP
                    this.m_btnShop.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked.bind(this), this)
                }

                let nodeLv = layout.getChildByName("btn_lv")
                if(nodeLv){
                    this.m_btnLv = nodeLv.getComponent(cc.Button)
                    this.m_btnLv.node.tag = BtnTag.BTN_TAG_LV
                    this.m_btnLv.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked.bind(this), this)
                }

                let nodeBook = layout.getChildByName("btn_book")
                if(nodeBook){
                    this.m_btnBook = nodeBook.getComponent(cc.Button)
                    this.m_btnBook.node.tag = BtnTag.BTN_TAG_BOOK
                    this.m_btnBook.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked.bind(this), this)
                }
            }
        }
    }

    init(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchEventStart.bind(this), this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchEventMove.bind(this), this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEventEnded.bind(this), this)

        this.m_visibleSize = cc.director.getVisibleSize()
        this.m_right = (this.m_visibleSize.width - this.background.node.width) * 0.5
        this.m_left = (this.background.node.width - this.m_visibleSize.width) * 0.5
        this.m_top = (this.m_visibleSize.height - this.background.node.height) * 0.5
        this.m_bottom = (this.background.node.height - this.m_visibleSize.height) * 0.5

        this.nodeSetting.active = false
        this.nodeSetting.scaleY = 0
    }

    initConfig(){

    }

    initCustoms(){

    }

    onTouchEventStart(event){
    }
    onTouchEventMove(event){
        let delta = event.touch.getDelta()
        if((this.background.node.x + delta.x) <= this.m_right && delta.x < 0){
            return
        }
        if((this.background.node.x + delta.x) >= this.m_left && delta.x > 0){
            return
        }
        if((this.background.node.y + delta.y) >= this.m_bottom && delta.y > 0){
            return
        }
        if((this.background.node.y + delta.y) <= this.m_top && delta.y < 0){
            return
        }

        this.background.node.x += delta.x
        this.background.node.y += delta.y
    }
    onTouchEventEnded(event){
    }

    onButtonClicked(event){
        let tag = event.currentTarget.tag
        switch(tag){
            case BtnTag.BTN_TAG_SETTING:{
                let self = this
                if(this.nodeSetting.active){
                    let scaleTo = cc.scaleTo(0.1, 1, 0)
                    let call = cc.callFunc(function(){
                        self.nodeSetting.active = false
                    })
                    this.nodeSetting.runAction(cc.sequence(scaleTo, call))
                }else{
                    this.nodeSetting.active = true
                    let scaleTo = cc.scaleTo(0.1, 1, 1)
                    this.nodeSetting.runAction(scaleTo)
                }
                break
            }
            case BtnTag.BTN_TAG_ACHIEVEMENT:{
                break
            }
            case BtnTag.BTN_TAG_SHOP:{
                break
            }
            case BtnTag.BTN_TAG_LV:{
                break
            }
            case BtnTag.BTN_TAG_BOOK:{
                break
            }
        }
    }
}
