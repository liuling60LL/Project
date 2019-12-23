class Matrix{
    m 
    constructor(martix) {
        this.m=martix
    }
    get rowsNum(){
        return this.m.length
    }
    get colsNum(){
        return this.m[0].length
    }
    forEach(cb) {
        for(let j=0;j<this.colsNum;j++){
            for(let i=0;i<this.rowsNum;i++){
                const element=this.m[i][j]
                cb(element,i,j)
            }
        }
    };
}
export {
    Matrix
}