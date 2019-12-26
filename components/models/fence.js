import { Cell } from "./cell";

class Fence{
    valueTitles = []
    specs

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