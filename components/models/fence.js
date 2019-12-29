import { Cell } from "./cell";

class Fence{
    valueTitles = [] //规格值 名字
    specs
    cells = []
    title
    id

    constructor(specs){
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }
    init(){
        this.specs.forEach(s => {
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        });
    }
    
   
}
export {
    Fence
}