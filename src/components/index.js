import ImageView from './imageView/index.vue'
import Sku from './XtxSku/index.vue'
//通过插件的方式将所有组件进行全局注册,即使用组件时无需导入
export const componentPlugin = {
  install(app) {
    //app.component('组件名字',组件配置对象)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}