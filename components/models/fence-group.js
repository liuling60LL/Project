import {Fence} from "./fence"
class FenceGroup{
    spu
    skuList =[]
    constructor(spu){
        this.spu = spu
        this.spuList = spu.sku_list
    }
    initFences(){
        const matrix=this._createMatrix(this.skuList)
        const fences=[]
        let currentJ= -1
        matrix.forEach((element,i,j) => {
            if(currentJ !==j){
                //开启一个新列，需要创建一个新的fence
                currentJ =j
                fences[j]=this._createFence(element)
            }
            fences[currentJ].pushValueTitles(element,value)
        });
    }
    _createFence(element){
        const fence=new Fence()
        // fence.pushValueTitles(element,value)
    }
    _createMatrix(skuList){
        const m =[{}]
        skuList.forEach(sku => {
            m.push(sku.specs)
        });
        return new Matrix(m)
    }
}
export {
    FenceGroup
}