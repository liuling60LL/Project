import { Http } from "../utils/http";

/*
 * @Author: liuling 
 * @Date: 2019-11-09 16:25:58 
 * @Last Modified by: liuling
 * @Last Modified time: 2019-11-09 16:34:33
 */
  export class Activity{
     static locationD ='a-2'
     static async getHomeLocationD(){
        return  await  Http.request({
            url:`activity/name/${Activity.locationD}`
        })
     }
 }