import Vue from 'vue'
import {
  Stepper,
  Panel,
  Tag,
  Card,
  Grid, GridItem,
  Toast,
  Swipe, SwipeItem,
  Tabbar, TabbarItem,
  Button,
  NavBar,
  Cell, CellGroup,
  Tab, Tabs,
  Lazyload,
  ImagePreview
} from 'vant'

Vue
  .use(Stepper)
  .use(Panel)
  .use(ImagePreview)
  .use(Tag)
  .use(Card)
  .use(Grid).use(GridItem)
  .use(Swipe).use(SwipeItem)
  .use(Tabbar).use(TabbarItem)
  .use(NavBar)
  .use(Button)
  .use(Tab).use(Tabs)
  .use(Cell).use(CellGroup)
  .use(Lazyload, options)
const options = {
  // 设置懒加载图片的地址
  loading: 'https://image.baidu.com/search/detail?ct=503316480&z=0&tn=baiduimagedetail&ipn=d&word=%E6%87%92%E5%8A%A0%E8%BD%BDgif&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=1003286220,497084294&os=3955082415,1598254633&simid=3398032427,315311915&pn=38&rn=1&di=6820&ln=286&fr=&fmq=1566896794563_R&fm=detail&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F01%2F20170301114404_GEjNy.thumb.700_0.gif&rpstart=0&rpnum=0&adpicid=0&force=undefined&ctd=1566896809939^3_1903X975%1'
}

Vue.prototype.$Toast = Toast
Vue.prototype.$ImagePreview = ImagePreview
