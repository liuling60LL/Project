/*
 * @Author: liuling 
 * @Date: 2019-11-21 17:57:53 
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-25 14:04:59
 */
import {Http} from "../utils/http"
import { Paging } from "../utils/paging"
class SpuPaging{
    static  getLatestPaging(){
        //实例化一个Paging对象
        return new Paging({
            url:`spu/latest`
        },5)
    }
}
export{
    SpuPaging
}