import { Cell } from "./cell";

class Fence{
    valueTitles = [] //规格值 名字
    specs
    cells = []

    constructor(specs){
        this.specs = specs
    }
    init(){
        this.specs.forEach(s => {
            // this.pushValueTitles(s.value)
            const cell = new Cell(s)
            this.cells.push(cell)
        });
    }
    
    // pushValueTitles(title){
    //     this.valueTitles.push(title)
    // }
}
export {
    Fence
}