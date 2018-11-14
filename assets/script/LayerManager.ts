const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerManager extends cc.Component {
    private static _instance:LayerManager = null
    private m_curLayer:cc.Node[] = []
    private m_curLayerIndex

    constructor(){
        super()     //先初始化父类
        this.m_curLayerIndex = -1
        cc.log("LayerManager 构造函数")
    }
    
    public static GetInstance():LayerManager {
        if(LayerManager._instance == null){
            cc.log("new LayerManager")
            LayerManager._instance = new LayerManager();            
        }
        return this._instance
    }

    /**
     * 
     * @method 直接在现有layer上面加载，不会移除已存在layer
     * @param layer 要加载的layer
     * @param parent 父节点
     */
    LoadLayer(url:string, parent:cc.Node){
        if(url == null || parent == null){
            return 
        }

        let self = this
        cc.loader.loadRes(url, cc.Prefab, function(error, prefab){
            if(error){
                cc.log("加载"+url+"失败：", error)
                return
            }
            self.m_curLayerIndex += 1
            self.m_curLayer[self.m_curLayerIndex] = cc.instantiate(prefab)
            if(!self.m_curLayer[self.m_curLayerIndex]){
                return
            }

            self.m_curLayer[self.m_curLayerIndex].active = true
            parent.addChild(self.m_curLayer[self.m_curLayerIndex])
        })
    }

    /**
     * @method 移除已加载的所有layer之后添加
     * @param layer 
     * @param parent 
     */
    ReplaceLayer(url:string, parent:cc.Node){
        if(url == null || parent == null){
            return 
        }

        for(let i = 0; i < this.m_curLayer.length; ++i){
            let lay = this.m_curLayer[i]
            if(lay){
                lay.destroy()
            }
        }
        this.m_curLayer = []
        this.m_curLayerIndex = -1

        this.LoadLayer(url, parent)
    }

    /**
     * 
     * @param layer 
     */
    RemoveLayer(){
    }

    RemoveLayerIndexOf(index){
    }
}
