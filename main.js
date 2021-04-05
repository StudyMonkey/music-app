import Vue from 'vue'
import App from './App'
import fetch from 'common/request.js'
import { getHeight } from 'common/util.js'

Vue.config.productionTip = false
Vue.prototype.$fetch = fetch
Vue.prototype.$getHeight = getHeight

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
