<style>
    @import './styles/index.css';
</style>
<template>
    <div class="lottery-page">
        <div v-show="loading && !loadError" class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
        <template v-show="!loading && !loadError">
            <canvas ref="lightBg" class="light-bg" width="1512" height="1512"></canvas>
            <div class="page-title"></div>
            <div class="counter-desc"><div>剩余<span>2</span>次抽奖机会</div></div>
            <div class="wheel">
                <canvas ref="wheel" width="662" height="662"></canvas>
            </div>
        </template>
        <div v-if="loadError && errorId" class="page-error">404<br/><span>您访问的页面不存在！</span></div>
    </div>
</template>
<script>
    import { Global } from './libs/global'

    module.exports = {
        data: function () {
            return {
                loading: false,
                loadError: false
            }
        },
        mounted: function () {
            var that = this
            that.$nextTick(function () {
                that.init()
                Global.tipShow('幸运大抽奖大页面！')
            })
        },
        methods: {
            init: function () {
                var that = this
                var pi = Math.PI

                // 绘制'光芒万丈'的背景
                var bgCtx = that.$refs.lightBg.getContext('2d')
                var radius = 756
                var num = 24
                var perDeg = 360 / (num * 2) * (pi / 180)
                var currDeg = 0

                var gradientTop = bgCtx.createLinearGradient(0, 0, 0, radius)
                gradientTop.addColorStop(0, 'rgba(255,255,255,.06)')
                gradientTop.addColorStop(1, 'rgba(255,255,255,.1)')
                bgCtx.fillStyle = gradientTop

                bgCtx.moveTo(radius, radius)
                for (var k = 0; k < num / 2; k++) {
                    bgCtx.lineTo(radius + radius * Math.cos(currDeg), radius - radius * Math.sin(currDeg))
                    currDeg = currDeg + perDeg
                    bgCtx.lineTo(radius + radius * Math.cos(currDeg), radius - radius * Math.sin(currDeg))
                    bgCtx.lineTo(radius, radius)
                    currDeg = currDeg + perDeg
                }
                bgCtx.fill()

                var gradientBottom = bgCtx.createLinearGradient(0, 0, 0, radius)
                gradientBottom.addColorStop(0, 'rgba(255,255,255,.1)')
                gradientBottom.addColorStop(1, 'rgba(255,255,255,.05)')
                bgCtx.fillStyle = gradientBottom
                bgCtx.moveTo(radius, radius)

                for (k = num / 2; k < num; k++) {
                    bgCtx.lineTo(radius + radius * Math.cos(currDeg), radius - radius * Math.sin(currDeg))
                    currDeg = currDeg + perDeg
                    bgCtx.lineTo(radius + radius * Math.cos(currDeg), radius - radius * Math.sin(currDeg))
                    bgCtx.lineTo(radius, radius)
                    currDeg = currDeg + perDeg
                }
                bgCtx.fill()

                // 绘制转盘
                var wheelCtx = that.$refs.wheel.getContext('2d')
                wheelCtx.strokeStyle = '#ff0000'
                wheelCtx.lineWidth = 8
                wheelCtx.arc(331, 331, 323, 0, 2 * pi)
                wheelCtx.stroke()

                wheelCtx.strokeStyle = '#de910d'
                wheelCtx.fillStyle = '#f8d300'
                wheelCtx.lineWidth = 1
                wheelCtx.arc(331, 331, 300, 0, 2 * pi)
                wheelCtx.stroke()
                wheelCtx.fill()
            }
        }
    }
</script>