import { Http } from "../utils/http";
//业务对象
export class Theme {
  static async getHomeLocationA() {
    return await Http.request({
      url: `theme/by/names`,
      data: {
        names: 't-1'
      },
    })
  }
}