/**
 * 全局的数据
 * */
import Vue from 'vue'

var wx = require('weixin-js-sdk')
// console.dir(wx)

exports.Global = {
    pageParams: {},
    tip: null,
    app: null, // 对app组件中this的引用
    baseWidth: null,                           // 页面加载时窗口初始宽度，用于计算页面 scale
    winWidth: null,                             // 页面内容容器的当前宽度--固定20rem
    winHeight: null,                            // 页面的高度
    winScale: 1,                                   // 页面当前的font scale
    userAgent: {                                  // 浏览器UA
        isWX: false,
        isiPhone: false
    },
    init: function () {
        var ua = navigator.userAgent.toLowerCase()
        var _this = this
        var userAgent = _this.userAgent

        window.addEventListener('resize', function () {
            _this.resizeWin()
        })
        _this.resizeWin()

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)
        _this.tip = document.querySelector('#app-tip')

        var url = location.href.split('?')
        if (url[1]) {
            var tempArr = url[1].split('&')
            var paramArr
            for (var k = 0; k < tempArr.length; k++) {
                paramArr = tempArr[k].split('=')
                if (paramArr.length === 2) {
                    _this.pageParams[paramArr[0]] = paramArr[1]
                }
            }
        }
    },
    resizeWin: function () {
        var _this = this
        var win = window
        var doc = document
        var htmlEl = doc.documentElement
        if (!_this.baseWidth) {
            _this.baseWidth = doc.body.clientWidth || 320
        }
        _this.winWidth = htmlEl.clientWidth || win.innerWidth || doc.body.clientWidth
        _this.winHeight = htmlEl.clientHeight || win.innerHeight
        _this.winWidth = _this.winWidth > 540 ? 540 : (_this.winWidth < 320 ? 320 : _this.winWidth)
        _this.winScale = _this.winWidth / _this.baseWidth
        htmlEl.style.fontSize = _this.winScale * 16 + 'px'
        htmlEl.style.backgroundColor = '#f0f0f0'
    },
    tipShow: function (content, time) {
        var _tip = this.tip
        if (!_tip) {
            _tip = this.tip = document.querySelector('#app-tip')
        }
        _tip.children[0].innerHTML = content
        _tip.classList.add('active')
        setTimeout(function () {
            _tip.classList.remove('active')
        }, (time || 3000))
    },
    localStorage: function (key, value) {
        if (value) localStorage.setItem(key, value)
        else return localStorage.getItem(key)
    },
    sessionStorage: function (key, value) {
        if (value) sessionStorage.setItem(key, value)
        else return sessionStorage.getItem(key)
    },
    shareConfig: function (option) {
        var win = window
        var _this = this
        if (!wx) return
        option = option || {}
        if (wx['signReady']) {
            if (option.title) {
                wx.hideMenuItems({menuList: ['menuItem:copyUrl']})
                wx.showAllNonBaseMenuItem()
                wx.onMenuShareAppMessage(option) // 分享给朋友
                wx.onMenuShareTimeline(option) // 分享到朋友圈
                wx.onMenuShareQQ(option) // 分享到QQ
                wx.onMenuShareWeibo(option) // 分享到腾讯微博
                wx.onMenuShareQZone(option) // 分享到QQ空间
            } else {
                wx.hideAllNonBaseMenuItem() // 屏蔽分享菜单
            }
        } else {
            win['requestSignCount'] = 2
            _this.weiXinCfgSignature(option)
        }
    },

    weiXinCfgSignature: function (option) {
        var loc = location
        var signUrl = loc.origin + loc.pathname + loc.search
        var win = window
        var _this = this

        Vue.http.get('../api/v1/wx/sign', {
            params: {
                url: encodeURIComponent(signUrl),
                sessionType: '9358'
            }
        }).then(function (res) {
            res = res.body
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'hideMenuItems']
            })

            if (!win['wxError']) {
                win['wxError'] = true
                wx.error(function () { // 微信分享配置失败
                    wx['signReady'] = false
                    win['requestSignCount']--
                    if (win['requestSignCount'] !== 0) {
                        _this.weiXinCfgSignature()
                    }
                })
            }

            if (!win['wxReady']) {
                win['wxReady'] = true
                wx.ready(function () {
                    wx['signReady'] = true
                    _this.shareConfig(option)
                })
            }
        })
    }
}
