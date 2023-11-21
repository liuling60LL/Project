import { FenceGroup } from "../models/fence-group"
import { Judger } from "../models/judger"
import { Spu } from "../../models/spu"
import { Cell } from "../models/cell"
import { Cart } from "../../models/cart"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object,
    orderWay:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
    previewImg:String,
    currentSkuCount:Cart.SKU_MIN_COUNT
  },

  //生命周期函数
  lifetimes:{
    attached(){
      //在组件实例进入页面节点树时执行
    },
    detached(){
      //移除时执行
    }
  },

  //监听器 -最适合处理数据
  observers:{
    'spu': function (spu) {
      if (!spu) {
          return
      }
      if(Spu.isNoSpec(spu)){
        this.processNoSpec(spu)
      }else{
        this.processHasSpec(spu)
      }
      this.triggerSpecEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //是否有规格
    processNoSpec(spu){
      this.setData({
        noSpec:true
      })
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
    },

    processHasSpec(spu){
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      const defaultSku = fenceGroup.getDefaultSku()
      if(defaultSku){
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
      }else{
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },

    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if(noSpec){
          this.triggerEvent('specchange',{
              noSpec
          })
      }
      else{
          this.triggerEvent('specchange',{
              noSpec:Spu.isNoSpec(this.properties.spu),
              skuIntact:this.data.judger.isSkuIntact(),
              currentValues:this.data.judger.getCurrentValues(),
              missingKeys:this.data.judger.getMissingKeys()
          })
      }
  },

    bindSpuData(){
      const spu = this.properties.spu
      this.setData({
        previewImg:spu.img,
        title:spu.title,
        price:spu.price,
        discountPrice:spu.discount_price
      })
    },
    bindSkuData(sku){
      this.setData({
        previewImg:sku.img,
        title:sku.title,
        price:sku.price,
        discountPrice:sku.discount_price,
        stock:sku.stock
      })
    },

    bindTipData(){
      this.setData({
        skuIntact:this.data.judger.isSkuIntact(),
        currentValues:this.data.judger.getCurrentValues(),
        missingKeys:this.data.judger.getMissingKeys()
      })
    },

    //初始默认数据
    bindFenceGroupData(fenceGroup){
      this.setData({
        fences:fenceGroup.fences,//模型对象
      })
    },

    setStockStatus(stock,currentCount){
      this.setData({
        outStock:this.isOutOfStock(stock,currentCount)
      })
    },

    isOutOfStock(stock,currentCount){
      //缺货
      return stock < currentCount
    },

    onSelectCount(event){
      const currentCount =event.detail.count
      this.data.currentSkuCount = currentCount

      // if(this.data.judger.isSkuIntact()){
      //   const sku = this.data.judger.getDeterminateSku()
      //   this.setStockStatus(sku.stock,currentCount)
      // }
      if (this.noSpec()) {
        this.setStockStatus(this.getNoSpecSku().stock, currentCount)
      } else {
          if (this.data.judger.isSkuIntact()) {
            const sku = this.data.judger.getDeterminateSku()
            this.setStockStatus(sku.stock, currentCount)
          }
      }
    },

    //点击cell 触发
    onCellTap(event){
      // console.log(event.detail);
     const data = event.detail.cell
     const x = event.detail.x
     const y = event.detail.y

     const  cell = new Cell(data.spec)
     cell.status = data.status

     const judger = this.data.judger
     judger.judge(cell,x,y)
     const skuIntact = judger.isSkuIntact()
     if(skuIntact){
      const currentSku = judger.getDeterminateSku()//报错
      this.bindSkuData(currentSku)
      this.setStockStatus(currentSku.stock,this.data.currentSkuCount)
     }
     this.bindTipData()
     this.bindFenceGroupData(judger.fenceGroup)
     this.triggerSpecEvent()
    },
    onBuyOrCart(event) {
      console.log('dfff',Spu.isNoSpec(this.properties.spu))
      if (!Spu.isNoSpec(this.properties.spu)) {
          this.shoppingNoSpec();
      } else {
          this.shoppingVarious();
      }
    },
    shoppingNoSpec() {
      this._triggerShoppingEvent(this.getNoSpecSku())
    },
    getNoSpecSku() {
      return this.properties.spu.sku_list[0]
    },
    shoppingVarious() {
      const intact = this.data.judger.isSkuIntact();
      if (!intact) {
          const missKeys = this.data.judger.getMissingKeys()
          wx.showToast({
              icon: "none",
              title: `请选择：${missKeys.join('，')}`,
              duration: 3000
          })
          return
      }
      this._triggerShoppingEvent(this.data.judger.getDeterminateSku())
    },
    _triggerShoppingEvent(sku) {
      this.triggerEvent('shopping', {
          orderWay: this.properties.orderWay,
          spuId: this.properties.spu.id,
          sku: sku,
          skuCount: this.data.currentSkuCount,
      })
    },
  }
})
