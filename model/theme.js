import { Http } from "../utils/http";
//业务对象
class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'
  //实例一个theme对象
  themes = []

  async getThemes(){
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    this.themes = await Http.request({
      url:`theme/by/names`,
      data:{
        names
      }
    })
  }

  async getHomeLocationA() {
    const themeA =this.themes.find(t => t.name === Theme.locationA)
    return themeA
  }
  async getHomeLocationE() {
    const themeE =this.themes.find(t => t.name === Theme.locationE)
    return themeE
  }
  async getHomeLocationF() {
    const themeF =this.themes.find(t => t.name === Theme.locationF)
    return themeF
  }
  async getHomeLocationH() {
    const themeH=this.themes.find(t => t.name === Theme.locationH)
    return themeH
  }
   async getHomeLocationESpu(){
    const eSpu =  this.getThemeSpuByName(Theme.locationE)
     return eSpu
  }
   async getThemeSpuByName(name){
    return await Http.request({
      url:`theme/name/${name}/with_spu`
    })
  }
}
export{
  Theme
}