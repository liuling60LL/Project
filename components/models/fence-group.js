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

    getSku(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
        return sku ? sku : null
    }

    setCellStatusById(cellId,status){
        this.eachCell((cell)=>{
            if(cell.id === cellId){
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status = status
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
            if(this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        });
        this.fences = fences
        // console.log(fences);
    }

    _hasSketchFence(){
        return this.spu.sketch_spec_id ? true : false
    }

    //是否是可视化fence
    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId ?true:false
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