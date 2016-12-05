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
        <template>
            <canvas ref="lightBg" class="light-bg" width="1512" height="1512" v-show="!loading && !loadError"></canvas>
            <div class="page-title" v-show="!loading && !loadError"></div>
            <div class="counter-desc" v-show="!loading && !loadError"><div>剩余<span>{{ currLotteryCount }}</span>次抽奖机会</div></div>
            <div class="wheel" v-show="!loading && !loadError">
                <canvas ref="wheel" width="662" height="662" :style="{ transform: 'rotate('+ needRotateDeg +'deg)', 'transition-duration' : needRotateDuration+'s'}" @transitionend="doHandlerRotateEnd()"></canvas>
                <canvas ref="pointer" width="158" height="210" @click="doClickLotteryBtn()"></canvas>
            </div>
            <div class="list-wrap winning-list" v-show="!loading && !loadError">
                <h3><span>中</span>奖名单</h3>
                <ul>
                    <li><div>张小花</div><div>恭喜您获得一瓶可乐</div></li>
                </ul>
            </div>
            <div class="list-wrap desc-list" v-show="!loading && !loadError">
                <h3><span>活</span>动说明</h3>
                <ul>
                    <li>1、活动时间2016-11-11至2016-12-12动时间2016-11-11至2016-12-12</li>
                    <li>2、分享可获取一次抽奖机会</li>
                    <li>3、分享可获取一次抽奖机会</li>
                    <li>4、分享可获取一次抽奖机会</li>
                </ul>
            </div>
        </template>
        <div v-if="loadError" class="page-error">404<br/><span>您访问的页面不存在！</span></div>
        <!-- 中奖 实物弹窗 -->
        <div class="pop-modal winning material" :class="{ active: popData.material }">
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
                <div class="close-btn" @click="closePopModal('material')">&times;</div>
            </div>
        </div>
        <!-- 中奖 优惠券 -->
        <div class="pop-modal winning coupon" :class="{ active: popData.coupon }">
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
                <div class="close-btn" @click="closePopModal('coupon')">&times;</div>
            </div>
        </div>
        <!-- 中奖 再抽一次 -->
        <div class="pop-modal winning again" :class="{ active: popData.again }">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>再抽一次的机会</h2>
                    <div class="btn"></div>
                </div>
                <div class="close-btn" @click="closePopModal('again')">&times;</div>
            </div>
        </div>
        <!-- 未中奖 分享可再抽一次 -->
        <div class="pop-modal no-winning" :class="{ active: popData.canShare }">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>非常遗憾！</h3>
                    <h4>谢谢您的参与，非常抱歉没能中奖！</h4>
                    <div class="cry"></div>
                    <div class="tip">分享活动，再抽<b>1</b>次</div>
                    <div class="btn"></div>
                </div>
                <split-line type="white"></split-line>
                <div class="act-desc">注：活动时间，每天都有2次机会</div>
                <div class="close-btn" @click="closePopModal('canShare')">&times;</div>
            </div>
        </div>
        <!-- 未中奖 没有抽奖机会 -->
        <div class="pop-modal no-winning" :class="{ active: popData.noChance }">
            <div class="center-wrap">
                <div class="top-wrap">
                    <h3>非常遗憾！</h3>
                    <h4>谢谢您的参与，非常抱歉没能中奖！</h4>
                    <div class="cry"></div>
                    <div class="tip">明天再来抽<b>{{ totalLotteryCount }}</b>次</div>
                    <div class="btn"></div>
                </div>
                <split-line type="white"></split-line>
                <div class="act-desc">注：活动时间，每天都有2次机会</div>
                <div class="close-btn" @click="closePopModal('noChance')">&times;</div>
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
                loading: true,
                loadError: false,
                currRotateDeg: 0, // 当前旋转的度数
                needRotateDeg: 0, // 当点击抽奖之后，转盘需要旋转的度数
                needRotateDuration: 5, // 旋转的时间
                inRotating: false, // 是否正在旋转抽奖中
                rewardGift: '', // 当前所中的奖品
                totalLotteryCount: 20, // 每天默认的可抽奖次数
                currLotteryCount: 20, // 当前的抽奖次数
                hasShared: false, // 是否已经分享了
                giftList: [
                    {name: '移动电源', type: 'material', deg: 0},
                    {name: '¥100元现金券', type: 'coupon', deg: 0},
                    {name: '谢谢惠顾', type: 'none', deg: 0},
                    {name: 'iphone 6s', type: 'material', deg: 0},
                    {name: '50元泰式按摩券', type: 'coupon', deg: 0},
                    {name: '再来一次', type: 'again', deg: 0}],
                popData: { // 控制弹窗的对象
                    material: false, // 中奖 实物弹窗
                    coupon: false, // 中奖 优惠券
                    again: false, // 中奖 再抽一次
                    canShare: false, // 未中奖 分享可再抽一次
                    noChance: false // 未中奖 没有抽奖机会
                }
            }
        },
        mounted: function () {
            var that = this
            that.$nextTick(function () {
                setTimeout(function () {
                    that.init()
                    that.loading = false
                }, 2000)
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
                var giftList = that.giftList
                var pieStyleArr = [{color: '#b92401', bgColor: '#fff6e5'}, {color: '#590202', bgColor: '#ffd488'}, {color: '#b92401', bgColor: '#fee0d5'}]
                perDeg = 360 / giftList.length * (pi / 180)
                var perDegNum = 360 / giftList.length
                var pieRadius = 283
                currDeg = pi / 2
                var currDegNum = 90
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
                var gift

                for (k = 0; k < giftList.length; k++) {
                    gift = giftList[k]
                    wheelCtx.beginPath()
                    wheelCtx.moveTo(331, 331)
                    wheelCtx.arc(331, 331, pieRadius, currDeg, currDeg + perDeg)
                    wheelCtx.lineTo(331, 331)
                    pieStyle = pieStyleArr[k % 3]
                    wheelCtx.fillStyle = pieStyle.bgColor
                    wheelCtx.fill()
                    wheelCtx.closePath()
                    gift.deg = currDegNum + perDegNum / 2 // 记住礼物的旋转度数
                    if (gift.deg > 360) {
                        gift.deg = gift.deg - 360
                    }
                    if (gift.deg < 270) {
                        gift.deg = 270 - gift.deg
                    } else {
                        gift.deg = 360 - (gift.deg - 270)
                    }
                    // 写入文本
                    wheelCtx.fillStyle = pieStyle.color
                    wheelCtx.save()

                    wheelCtx.translate(331, 331)
                    // console.log('旋转：' + (currDeg + perDeg / 2))
                    wheelCtx.rotate(currDeg + perDeg / 2 + pi / 2)

                    giftName = giftList[k].name
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
                    currDegNum += perDegNum
                }

                console.dir(giftList)

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
            },
            closePopModal: function (popName) {
                this.popData[popName] = false
            },
            doClickLotteryBtn: function () {
                var that = this
                if (that.inRotating) {
                    return Global.tipShow('抽奖中...')
                }
                if (that.currLotteryCount == 0) {
                    return Global.tipShow('当前您的剩余抽奖次数为0！')
                }
                var giftList = that.giftList
                that.rewardGift = giftList[parseInt(Math.random() * giftList.length)]
                that.inRotating = true
                var deltDeg = 360 * 3 + that.rewardGift.deg - that.currRotateDeg % 360
                that.needRotateDuration = 0.75 * (deltDeg / 180)
                that.needRotateDeg = that.currRotateDeg + deltDeg
                console.log('needRotateDeg：' + that.needRotateDeg + 'deltDeg：' + deltDeg + 'duration：' + that.needRotateDuration)
                that.currRotateDeg = that.needRotateDeg
            },
            doHandlerRotateEnd: function () { // 转盘旋转结束的处理
                var that = this
                if (that.inRotating) {
                    that.inRotating = false
                    that.currLotteryCount -- // 抽奖次数-1
                    var rewardType = that.rewardGift.type
                    console.log('当前的中奖：' + that.rewardGift.name)
                    if (/^(material|coupon|again)$/.test(rewardType)) {
                        that.popData[rewardType] = true
                    } else if (rewardType == 'none') { // 未能中奖
                        if (!that.hasShared) { // 还未分享，分享可在抽一次
                            that.popData.canShare = true
                        } else {
                            that.popData.noChance = true
                        }
                    }

                    if (rewardType == 'again') { // 抽中再来一次，抽奖次数+1
                        that.currLotteryCount ++
                    }
                }
            }
        }
    }
</script>