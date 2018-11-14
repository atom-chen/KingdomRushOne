const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomInfoLayer extends cc.Component {

    @property(cc.RichText)
    labCustomInfo:cc.RichText = null;

    // onLoad () {}

    start () {
        this.initConfig()
    }

    // update (dt) {}

    initConfig(){
        this.initCustomInfo()
    }

    initCustomInfo(){
        if(!this.labCustomInfo){
            return
        }
        let self = this
        cc.loader.loadRes("customDescription/0.json", function(error, jsonObject){
            if(error){
                cc.log("0.json加载失败")
            }else{
                cc.log(jsonObject)
                self.labCustomInfo.string = "<color=#000000>"+ jsonObject.blueStrTop + "</c>" + 
                "<color=#6433FF>" + jsonObject.blueStr1 + "</c><color=#000000>" + jsonObject.blackStr1 + "</c>"
            }
        })
    }
}
