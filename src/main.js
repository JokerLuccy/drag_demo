import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import '@/custom-component' // 注册自定义组件

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/utils/codeEditor'
// import '@/utils/rem'
import lodash from 'lodash'

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = true
Vue.prototype.$_ = lodash
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
