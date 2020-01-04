// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell:Object,
    y:Number,//在矩阵中的行列号
    x:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      // console.log(event);
      this.triggerEvent('celltap',{
        cell:this.properties.cell,
        x:this.properties.x,
        y:this.properties.y
      },{
        bubbles: true,//事件是否冒泡
        composed: true //事件是否可以穿越组件边界
      })
    }
  }
})
