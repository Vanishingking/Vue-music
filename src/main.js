import { createApp } from 'vue'
import App from './App.vue'
import '../public/css/iconfont.css'
import router from "./router"
import store from './store/index'
import 'element-plus/lib/theme-chalk/index.css'
import { Picker } from 'vant';
import { Slider } from 'vant';
import 'vant/lib/index.css';
import { DatetimePicker } from 'vant';
import { Button,Popup,Swipe, SwipeItem,Search,Empty, Dialog,ShareSheet,NoticeBar,Toast,SwipeCell,Overlay} from 'vant';

// 按需引用
import {ElSelect, ElCarouselItem, ElUpload,ElProgress} from 'element-plus';
const app = createApp(App)
app.use(router)
app.use(store)
app.component(ElSelect.name, ElSelect)
app.component(ElUpload.name,ElUpload)
app.component(ElCarouselItem.name,ElCarouselItem)
app.component(ElProgress.name,ElProgress)
app.use(Picker)
app.use(DatetimePicker)
app.use(Slider)
app.use(Button)
app.use(Popup)
app.use(Swipe)
app.use(SwipeItem)
app.use(Search)
app.use(Empty)
app.use(ShareSheet)
app.use(NoticeBar)
app.use(Overlay)
app.use(Toast)
app.use(Dialog)
app.use(SwipeCell)

app.mount('#app')
