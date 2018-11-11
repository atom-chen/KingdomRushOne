const {ccclass, property} = cc._decorator;

enum BtnTag{
    BTN_TAG_SAVELOT_BEGIN = 100,
    BTN_TAG_SAVELOT_1,
    BTN_TAG_SAVELOT_2,
    BTN_TAG_SAVELOT_3,
    BTN_TAG_CLOSE
}

@ccclass
export default class SavelotLayer extends cc.Component {
    m_animation:cc.Animation = null
    m_btnClose:cc.Button = null
    m_btnNewItem:cc.Button[] = []

    @property(Number)
    btnNewItemNum:number = 0

    // onLoad () {}

    start () {
        let layout = this.node.getChildByName("layout")
        if(layout){
            for(let i = 0; i < this.btnNewItemNum; ++i){
                let nodeItem = layout.getChildByName("btn_savelot_"+(i+1))
                if(nodeItem){
                    let btn = nodeItem.getComponent(cc.Button)
                    btn.node.tag = BtnTag.BTN_TAG_SAVELOT_BEGIN + (i + 1)
                    btn.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
                    this.m_btnNewItem.push(btn)
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

    // update (dt) {}

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEventEnded, this)
        // this.m_btnClose.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)

        // for(let i = 0; i < this.m_btnNewItem.length; ++i){
        //     let btn = this.m_btnNewItem[i]
        //     btn.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClicked, this)
        // }

        cc.loader.release("perfab/savelotLayer")
    }


    onTouchEventEnded(event){
    }

    onButtonClicked(event){
        let tag = event.currentTarget.tag
        switch(tag){
            case BtnTag.BTN_TAG_SAVELOT_1:case BtnTag.BTN_TAG_SAVELOT_2:case BtnTag.BTN_TAG_SAVELOT_3:{
                //let path = jsb.fileUtils.getWritablePath()
                //cc.log(path)
                this.saveForBrowser("krejtkrejgjkfdngjksfhg","abcdefgwq.json")
                cc.log("New item Clicked")
                break
            }
            case BtnTag.BTN_TAG_CLOSE:{
                cc.log("关闭按钮被点击")
                this.node.destroy()
            }
        }
    }

    init(){

    }

    initConfig(){

    }

    saveForBrowser(textToWrite, fileNameToSaveAs) {
        if (cc.sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            //downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    }
}
