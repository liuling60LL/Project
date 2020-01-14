import { Cell } from "./cell";

//Sku选择 存储已选的cell
class SkuPending{
    pending = []
    size

    constructor(size){
        this.size = size
    }

    init(sku){
        this.size =sku.specs.length
        for(let i =0;i<sku.specs.length;i++){
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell,i)
        }
    }

    isIntact(){
        if(this.size !== this.pending.length){
            return false
        }
        for (let i =0;i<this.length;i++){
            if(this._isEmptyPart(index)){
                return false
            }
        }
        return true
    }

    _isEmptyPart(index){
        // return this.pending[index] ? false :true
        return !this.pending[index] 
    }

    insertCell(cell,x){
        this.pending[x] =cell
    }
    removeCell(x){
        this.pending[x] = null
    }

    findSelectedCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if(!pendingCell){
            return false
        }
        return cell.id === pendingCell.id 
    }

}

export{
    SkuPending
}