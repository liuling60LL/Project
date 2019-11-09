import { Http } from "../utils/http";

/*
 * @Author: liuling 
 * @Date: 2019-11-09 13:37:47 
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-09 14:23:18
 */
export class Category{
    static async getGridCategory(){
        return await Http.request({
            url:`category/grid/all`
        })
    }
}
