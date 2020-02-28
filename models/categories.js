import {Http} from "../utils/http"
class Categories{
    roots = [] //一级分类
    subs = [] //二级分类
    //静态方法不能保存状态
    async getAll(){
        const data = await Http.request({
            url:`category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots(){
        return this.roots
    }
    getSubs(rootId){
        return this.roots.find(r=>r.id === rootId)
    }
}
export {
    Categories
}