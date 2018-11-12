
export default class utils{
    public static writeStorage(key:string, value:any):void{
        if(key == null || key.length == 0){
            cc.log("保存Storage时，Key不能为空")
            return
        }

        let strValue = JSON.stringify(value)
        localStorage.setItem(key,strValue)
    }

    public static readStorage(key:string):any{
        if(key == null || key.length == 0){
            cc.log("读取Storage时，Key不能为空")
            return
        }

        let strJson = localStorage.getItem(key)
        let jsonObj = JSON.parse(strJson)

        return jsonObj
    }

    public static deleteStorage(key:string){
        if(key == null || key.length == 0){
            cc.log("删除Storage时，Key不能为空")
            return
        }

        localStorage.removeItem(key)
    }
}