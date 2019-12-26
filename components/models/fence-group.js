import {Fence} from "./fence"
import {Matrix} from "./matrix"
class FenceGroup{
    spu
    skuList =[]
    // fences = []

    //初始化构造函数
    constructor(spu){
        this.spu = spu
        this.spuList = spu.sku_list
    }

    //主方法-初始化fences
    initFences(){
        const matrix=this._createMatrix(this.skuList)
        const fences=[]
        // let currentJ= -1
        // matrix.forEach((element,i,j) => {
        //     if(currentJ !==j){
        //         //开启一个新列，需要创建一个新的fence
        //         currentJ =j
        //         fences[currentJ]=this._createFence(element)
        //     }
        //     fences[currentJ].pushValueTitles(element.value)
        // });
        // console.log('fence',fences);
        const AT = matrix.transpose()
        console.log('AT',AT);
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        });
    }
    _createFence(element){
        const fence=new Fence()//不能传入r  同一种规格的同一种值
        return fence
        // fence.pushValueTitles(element,value)
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}
export {
    FenceGroup
}