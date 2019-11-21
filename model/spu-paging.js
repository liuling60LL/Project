/*
 * @Author: liuling 
 * @Date: 2019-11-21 17:57:53 
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-21 19:16:35
 */
import {Http} from "../utils/http"
import { Paging } from "../utils/paging"
class SpuPaging{
    static async getLatestPaging(){
        return new Paging({
            url:`spu/latest`
        },3)
    }
}
export{
    SpuPaging
}