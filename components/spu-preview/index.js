// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object

  },

  /**
   * 组件的初始数据
   */
  data: {
    tags:Array
  },
  //监听器
  observers:{
    data:function(data){
      if(!data){
        return
      }
      if(!data.tags){
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 动态计算图片宽高
    onImgLoad(event){
      const {width,height} = event.detail
      this.setData({
        w:340,
        h:340*height/width
      })
    },

    onItemTap(event){
      // console.log(event);
      const  pid =event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`,
        success: (result)=>{
          // console.log('跳转成功');
        },
        fail: ()=>{console.log('跳转失败');},
        complete: ()=>{}
      });
    }

  }
})
