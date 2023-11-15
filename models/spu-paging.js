/*
 * @Author: liuling
 * @Date: 2019-11-21 17:57:53
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-25 14:04:59
 */
import {Paging} from "../utils/paging";

class SpuPaging{
    static getLatestPaging() {
        return new Paging({
            url:`spu/latest`
        },5)
    }

  static getByCategoryPaging(cid, isRoot) {
    return new Paging({
      url: `spu/by/category/${cid}?is_root=${isRoot}`
    })
  }
}

export {
    SpuPaging
}