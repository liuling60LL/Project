//Sku选择 存储已选的cell
class SkuPending{
    pending = []

    constructor(){

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

}

export{
    SkuPending
}