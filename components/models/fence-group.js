import {Fence} from "./fence"
import {Matrix} from "./matrix"
class FenceGroup{
    spu
    skuList = []
    fences = []

    //初始化构造函数
    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if(!defaultSkuId){
            return
        }
        return this.skuList.find(s=>s.id === defaultSkuId)
    }

    //主方法-初始化fences
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        // let currentJ= -1
        // matrix.each((element,i,j) => {
        //     if(currentJ !==j){
        //         //开启一个新列，需要创建一个新的fence
        //         currentJ =j
        //         fences[currentJ]=this._createFence(element)
        //     }
        //     // fences[currentJ].pushValueTitles(element.value)
        // });
        // console.log('fence',fences);
        const AT = matrix.transpose()
        // console.log('AT',AT);
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        });
        this.fences = fences
        // console.log(fences);
    }

    eachCell(cb){
        for(let i =0;i<this.fences.length;i++){//行
            for(let j =0;j<this.fences[i].cells.length;j++){//列
                const cell= this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }

    _createFence(element){
        console.log('element',element);
        const fence=new Fence()//不能传入r  同一种规格的同一种值
        // fence.pushValueTitles(element.value)
        return fence
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m) //返回类
    }
}
export {
    FenceGroup
}