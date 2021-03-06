import { SkuCode } from "./spu-code"
import { CellStatus } from "../../core/enum"
import { SkuPending } from "./sku-pending"
import { Joiner } from "../../utils/joiner"

class Judger{
    fenceGroup
    pathDict = []//code码 组合 集合
    skuPending

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact(){
        return this.skuPending.isIntact()
    }

    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys(){
        const missingKeyIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeyIndex.map(i =>{
            return this.fenceGroup.fences[i].title
        })
    }

    _initSkuPending(){
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if(!defaultSku){
            return
        }
        this.skuPending.init(defaultSku)
        //初始化已选中的相关的cell
        this._initSelectedCell()
        this.judge(null,null,null,true)
        // console.log(this.skuPending);
        
    }

    _initSelectedCell(){
        this.skuPending.pending.forEach(cell =>{
            this.fenceGroup.setCellStatusById(cell.id,CellStatus.SELECTED)
        })
    }

    _initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        // console.log(this.pathDict);
    }

    judge(cell,x,y,isInit=false){
        if(!isInit){
            this._changeCurrentCellStatus(cell,x,y)
        }
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            // console.log("path",path);
            if(!path){
                return
            }
            const isIn = this._isInDict(path)
            if(isIn){
                this.fenceGroup.setCellStatusByXY(x,y,CellStatus.WAITING)
            }else{
                this.fenceGroup.setCellStatusByXY(x,y,CellStatus.FORBIDDEN)
            }
        })
    }

    //获取确定的SKU
    getDeterminateSku() {
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }

    //判断路径是否在字典里
    _isInDict(path){
        return this.pathDict.includes(path)
    }

    //寻找潜在路径
    _findPotentialPath(cell,x,y){
        const joiner = new Joiner('#')
        for(let i=0;i<this.fenceGroup.fences.length;i++){
            //x:当前行 i:已选的元素
            const selected = this.skuPending.findSelectedCellByX(i)
            if(x === i){
                if(this.skuPending.isSelected(cell,x)){
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            }else{
                //其他行  需要判断
                if(selected){
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    //cell当前状态
    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fenceGroup.setCellStatusByXY(x,y,CellStatus.SELECTED) 
            this.skuPending.insertCell(cell,x)
        }
        if(cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fenceGroup.setCellStatusByXY(x,y,CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }
    //私有的方法 在前面加下滑线_
}
export{
    Judger
}