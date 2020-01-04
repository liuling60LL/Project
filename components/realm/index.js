import { FenceGroup } from "../models/fence-group"
import { Judger } from "../models/judger"

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
    judger:Object
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
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      this.setData({
        fences:fenceGroup.fences//模型对象
      })
    },

    //点击cell 触发
    onCellTap(event){
      // console.log(event.detail);
     const cell = event.detail.cell
     const x = event.detail.x
     const y = event.detail.y
     const judger = this.data.judger
     judger.judge(cell,x,y)
     this.setData({
      fences:judger.fenceGroup.fences
     })
    }
  }
})
