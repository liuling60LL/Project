import { Http } from "./http"

class Paging{
    //实例化
    req   //url参数
    start  //获取记录的起始序号
    count //一次获取记录的条数
    locker  = false
    url
    moreData = true
    accumulator=[] //累加器

    //初始化 构造函数
    constructor(req,count=10,start=0){
        this.start=start
        this.count=count
        this.req=req
        this.url = req.url
    }
    //不断获取新数据
    async getMoreData(){
        if(!this.moreData){
            return 
        }
        if(!this._getLocker()){
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }
    //获取真实的数据
    async _actualGetData(){
        const req =this._getCurrentReq()
        let paging = await Http.request(req)
        //如果数据不存在
        if(!paging){
            return null
        }
        //没有数据
        if(paging.total ===0){
            return {
                empty:true,//是否数据为空
                items:[],  //真实数据
                moreData:false, //是否有更多数据
                accumulator:[],//累计数据
            }
        }
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty:false,
            items:paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }
    }
    //累加器
    _accumulate(items){
        this.accumulator = this.accumulator.concat(items)
    }
    //更多数据
    static _moreData(totalPage,pageNum){
        return pageNum < totalPage -1
    }
    //获取当前的请求对象
    _getCurrentReq(){
        let url =this.url
        const params =`start=${this.start}&count=${this.count}`//url路径不能有空格，容易报错
        //url 路径拼接的两种情况
        // url=v1/spu/latest+'?'+params
        // url=v1/spu/latest?other=123+'&'+params
        if(url.includes('?') ){
            url += '&'+params
        }else{
            url += '?' +params
        }
        this.req.url = url
        return this.req
    }
    //数据锁
    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true
    }
    //释放锁
    _releaseLocker(){
        this.locker = false
    }

}
export{
    Paging
}