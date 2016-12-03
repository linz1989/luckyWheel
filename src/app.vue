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
                <canvas ref="pointer" width="158" height="210"></canvas>
            </div>
            <div class="list-wrap winning-list">
                <h3><span>中</span>奖名单</h3>
                <ul>
                    <li><div>张小花</div><div>恭喜您获得一瓶可乐</div></li>
                    <li><div>张小花</div><div>恭喜您获得一瓶可乐</div></li>
                    <li><div>张小花</div><div>恭喜您获得一瓶可乐</div></li>
                </ul>
            </div>
            <div class="list-wrap desc-list">
                <h3><span>活</span>动说明</h3>
                <ul>
                    <li>1、活动时间2016-11-11至2016-12-12动时间2016-11-11至2016-12-12</li>
                    <li>2、分享可获取一次抽奖机会</li>
                    <li>3、分享可获取一次抽奖机会</li>
                    <li>4、分享可获取一次抽奖机会</li>
                </ul>
            </div>
        </template>
        <div v-if="loadError && errorId" class="page-error">404<br/><span>您访问的页面不存在！</span></div>
        <!-- 中奖 实物弹窗 -->
        <div class="pop-modal winning material">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>iphone 6s</h2>
                    <div class="btn"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc">
                    <li>1、您的兑换码为：11111111</li>
                    <li>2、您的兑换码为：<a>立即查看</a></li>
                    <li>3、您的兑换码为：11111111</li>
                    <li>4、您的兑换码为：11111111</li>
                </ul>
                <div class="close-btn">&times;</div>
            </div>
        </div>
        <!-- 中奖 优惠券 -->
        <div class="pop-modal winning coupon">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <div class="coupon">
                        <div>198元</div>
                        <div>满100元可用</div>
                        <div>券有效期：2015-11-11至2016-12-12</div>
                        <div>现金券</div>
                    </div>
                    <div class="btn"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc">
                    <li>1、您的兑换码为：11111111</li>
                    <li>2、您的兑换码为：<a>立即查看</a></li>
                    <li>3、您的兑换码为：11111111</li>
                    <li>4、您的兑换码为：11111111</li>
                </ul>
                <div class="close-btn">&times;</div>
            </div>
        </div>
        <!-- 中奖 在抽一次 -->
        <div class="pop-modal winning again active">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>再抽一次的机会</h2>
                    <div class="btn"></div>
                </div>
                <div class="close-btn">&times;</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Global } from './libs/global'
    import SplitLine from './components/splitLine'

    module.exports = {
        components: {
            'split-line': SplitLine
        },
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
                wheelCtx.strokeStyle = '#ffb534'
                wheelCtx.lineWidth = 8
                wheelCtx.arc(331, 331, 323, 0, 2 * pi)
                wheelCtx.stroke()

                wheelCtx.beginPath()
                wheelCtx.strokeStyle = '#de910d'
                wheelCtx.fillStyle = '#f8d300'
                wheelCtx.lineWidth = 1
                wheelCtx.arc(331, 331, 319, 0, 2 * pi)
                wheelCtx.stroke()
                wheelCtx.fill()

                wheelCtx.beginPath()
                wheelCtx.strokeStyle = '#d28500'
                wheelCtx.lineWidth = 11
                wheelCtx.arc(331, 331, 289, 0, 2 * pi)
                wheelCtx.stroke()

                // 绘制白点
                var smallRadius = 6
                var bigRadius = 8
                var dotRadius = 307

                perDeg = 360 / 18 * (pi / 180)
                currDeg = pi / 2
                wheelCtx.fillStyle = '#fff'
                for (k = 0; k < 9; k++) {
                    wheelCtx.beginPath()
                    wheelCtx.arc(331 + Math.cos(currDeg) * dotRadius, 331 - Math.sin(currDeg) * dotRadius, smallRadius, 0, 2 * pi)
                    wheelCtx.fill()
                    currDeg += perDeg
                    wheelCtx.beginPath()
                    wheelCtx.arc(331 + Math.cos(currDeg) * dotRadius, 331 - Math.sin(currDeg) * dotRadius, bigRadius, 0, 2 * pi)
                    wheelCtx.fill()
                    currDeg += perDeg
                }

                // style list
                var pieStyleArr = [{color: '#b92401', bgColor: '#fff6e5'}, {color: '#590202', bgColor: '#ffd488'}, {color: '#b92401', bgColor: '#fee0d5'}]
                var giftList = ['移动', '¥100元现金券', '谢谢惠顾', 'iphone 6s', '50元泰式按摩券', '谢谢惠顾']
                perDeg = 360 / giftList.length * (pi / 180)
                var pieRadius = 283
                currDeg = pi / 2
                var pieStyle
                wheelCtx.font = 'bold 44px 微软雅黑'
                var pieLineWidth = (2 * pi * pieRadius * 0.58) / giftList.length
                // console.log('pieLineWidth：' + pieLineWidth)
                wheelCtx.textAlign = 'center'
                wheelCtx.textBaseline = 'middle'

                var giftName
                var topText
                var bottomText
                var splitTextPos
                var splitArr

                for (k = 0; k < giftList.length; k++) {
                    wheelCtx.beginPath()
                    wheelCtx.moveTo(331, 331)
                    wheelCtx.arc(331, 331, pieRadius, currDeg, currDeg + perDeg)
                    wheelCtx.lineTo(331, 331)
                    pieStyle = pieStyleArr[k % 3]
                    wheelCtx.fillStyle = pieStyle.bgColor
                    wheelCtx.fill()
                    wheelCtx.closePath()

                    // 写入文本
                    wheelCtx.fillStyle = pieStyle.color
                    wheelCtx.save()

                    wheelCtx.translate(331, 331)
                    // console.log('旋转：' + (currDeg + perDeg / 2))
                    wheelCtx.rotate(currDeg + perDeg / 2 + pi / 2)

                    giftName = giftList[k]
                    if (wheelCtx.measureText(giftName).width > pieLineWidth) { // 处理两行字的情况
                        splitArr = giftName.split(' ')
                        if (splitArr.length == 2) { // 有空格间隔
                            topText = splitArr[0]
                            bottomText = splitArr[1]
                        } else {
                            splitTextPos = that.getTextSplitPos(giftName, wheelCtx, pieLineWidth)
                            topText = giftName.substr(0, splitTextPos)
                            bottomText = giftName.substr(splitTextPos)
                        }
                        // console.log('topText：' + topText + 'bottomText：' + bottomText)
                        wheelCtx.fillText(topText, 0, -pieRadius * 0.72, pieLineWidth)
                        wheelCtx.fillText(bottomText, 0, -pieRadius * 0.52, pieLineWidth)
                    } else {
                        // 一行字直接绘制在中心点
                        wheelCtx.fillText(giftName, 0, -pieRadius * 0.65)
                    }

                    wheelCtx.restore()
                    currDeg += perDeg
                }

                // 绘制指针
                var pointerCtx = that.$refs.pointer.getContext('2d')

                pointerCtx.fillStyle = '#ffa406'
                var pointerPanRadius = 79
                var pointerCenter = 210 - pointerPanRadius
                pointerCtx.arc(pointerPanRadius, pointerCenter, pointerPanRadius, 0, 2 * pi)
                pointerCtx.fill()

                pointerCtx.beginPath()
                var pointerHeight = 80
                var pointerWidth = 64
                pointerCtx.fillStyle = '#eb1244'

                pointerCtx.moveTo(pointerPanRadius, 0)
                pointerCtx.lineTo(pointerPanRadius - pointerWidth / 2, pointerHeight)
                pointerCtx.lineTo(pointerPanRadius, pointerHeight)
                pointerCtx.lineTo(pointerPanRadius, 0)
                pointerCtx.closePath()
                pointerCtx.fill()

                pointerCtx.fillStyle = '#b9072f'
                pointerCtx.beginPath()
                pointerCtx.moveTo(pointerPanRadius, 0)
                pointerCtx.lineTo(pointerPanRadius + pointerWidth / 2, pointerHeight)
                pointerCtx.lineTo(pointerPanRadius, pointerHeight)
                pointerCtx.lineTo(pointerPanRadius, 0)
                pointerCtx.closePath()
                pointerCtx.fill()

                pointerCtx.beginPath()
                pointerCtx.fillStyle = '#fa5f75'
                pointerCtx.arc(pointerPanRadius, pointerCenter, pointerPanRadius - 15, 0, 2 * pi)
                pointerCtx.closePath()
                pointerCtx.fill()

                pointerCtx.beginPath()
                pointerCtx.fillStyle = '#f63a5f'
                pointerCtx.arc(pointerPanRadius, pointerCenter, pointerPanRadius - 25, 0, 2 * pi)
                pointerCtx.closePath()
                pointerCtx.fill()

                pointerCtx.font = 'bold 36px 微软雅黑'
                pointerCtx.textAlign = 'center'
                pointerCtx.textBaseline = 'middle'
                pointerCtx.fillStyle = '#fff'
                pointerCtx.fillText('点击', pointerPanRadius, pointerCenter - 24)
                pointerCtx.fillText('抽奖', pointerPanRadius, pointerCenter + 16)
            },
            getTextSplitPos: function (text, ctx, lineWidth) { // 计算出文本换行的分割点
                if (text.length <= 3) {
                    return text.length
                }
                if (/^[\u4E00-\u9FFF]+$/.test(text)) { // 文本都是汉字，从中间分隔
                    return Math.ceil(text.length / 2)
                } else { // 依据字宽计算出分隔点
                    var str = text.substr(0, 3)
                    for (var i = 3; i < text.length; i++) {
                        str = str + text.charAt(i)
                        if (ctx.measureText(str).width > lineWidth) {
                            return i + 1
                        }
                    }
                }
                return text.length
            }
        }
    }
</script>