import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app'
import { Global } from './libs/global'

var global = Global
global.init()
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

window['_g'] = global

// 设置vue-resource的inteceptor
Vue.http.interceptors.push(function (request, next) {
    // 设置全局的请求参
    if (request.method.toLowerCase() === 'get') {
        request.params['_'] = (+new Date()) // 时间戳
        request.params['token'] = global.userToken
    } else {
        var body = request.body
        if (!body['token']) {
            body['token'] = global.userToken
        }
    }

    // 回调响应函数之前的处理
    next(function (response) {
        if (response.status == 401) {
            global.tipShow('请您先登录！')
            setTimeout(function () {
                global.sessionStorage('spa_login_luckyWheel', global.pageParams.actId)
                global.toSpaPage('login')
            }, 500)
        }
        return response
    })
})

/* eslint-disable no-new */
new Vue({el: '#app', render: h => h(App)})
