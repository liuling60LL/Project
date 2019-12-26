import { FenceGroup } from "../models/fence-group"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

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
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
