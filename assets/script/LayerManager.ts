const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerManager extends cc.Component {
    private static _instance:LayerManager = null
    private m_curLayer:cc.Node[] = null

    constructor(){
        super()     //先初始化父类
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
    LoadLayer(layer:cc.Node, parent:cc.Node){
        if(layer == null || parent == null){
            return 
        }

        parent.addChild(layer)
        this.m_curLayer.push(layer)
    }

    /**
     * @method 移除已加载的所有layer之后添加
     * @param layer 
     * @param parent 
     */
    ReplaceLayer(layer:cc.Node, parent:cc.Node){
        if(layer == null || parent == null){
            return 
        }

        for(let i = 0; i < this.m_curLayer.length; ++i){
            let lay = this.m_curLayer[i]
            if(lay){
                lay.destroy()
            }
        }
        this.m_curLayer = []

        this.LoadLayer(layer, parent)
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
