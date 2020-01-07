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

    _initSkuPending(){
        this.skuPending = new SkuPending()
    }

    _initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        // console.log(this.pathDict);
    }

    judge(cell,x,y){
        this._changeCurrentCellStatus(cell,x,y)
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            // console.log("path",path);
            if(!path){
                return
            }
            const isIn = this._isInDict(path)
            if(isIn){
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            }else{
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
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
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.skuPending.insertCell(cell,x)
        }
        if(cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fenceGroup.fences[x].cells[y].status =CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }
    //私有的方法 在前面加下滑线_
}
export{
    Judger
}