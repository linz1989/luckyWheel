<style>
    @import './styles/index.css';
</style>
<template>
    <div class="lottery-page">
        <div ref="spinner" v-show="loading && !loadError" class="spinner act" @transitionend="doLoadingHide()">
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
            <canvas ref="lightBg" class="light-bg ani" width="1512" height="1512" v-show="!loading && !loadError"></canvas>
            <div class="page-title ani" v-show="!loading && !loadError"></div>
            <div class="counter-desc ani" v-show="!loading && !loadError"><div>剩余<span>{{ currLotteryCount }}</span>次抽奖机会</div></div>
            <div class="wheel ani" v-show="!loading && !loadError">
                <canvas ref="wheel" width="662" height="662" :style="{ transform: 'rotate('+ needRotateDeg +'deg)', 'transition-duration' : needRotateDuration+'s'}" @transitionend="doHandlerRotateEnd()"></canvas>
                <canvas ref="pointer" width="158" height="210" @click="doClickLotteryBtn()"></canvas>
            </div>
            <div class="list-wrap winning-list ani" v-show="!loading && !loadError">
                <h3><span>中</span>奖名单</h3>
                <ul>
                    <li v-if="recordList.length == 0"><div>暂无中奖名单。</div></li>
                    <li v-if="recordList.length > 0" v-for="item in recordList"><div>{{ item.userName }}</div><div>恭喜您获得{{ item.prizeName }}</div></li>
                </ul>
            </div>
            <div class="list-wrap desc-list ani" v-show="!loading && !loadError">
                <h3><span>活</span>动说明</h3>
                <div v-html="actDesc"></div>
            </div>
        </template>

        <div v-if="loadError" class="page-error">404<br/><span>{{ loadErrorTip || '您访问的页面不存在！' }}</span></div>
        <div class="back-btn ani"><div @click="toSpaPage('home')"></div><!-- div @click="toSpaPage('home')">会所</div --></div>

        <!-- 中奖 实物弹窗 -->
        <div class="pop-modal winning material" :class="{ active: popData.material }" @click="closePopModal('material')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap" v-if="rewardGift">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>{{ rewardGift.name }}</h2>
                    <div class="btn" @click="doClickShareBtn('material')"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc" v-if="rewardData">
                    <li>1、您的兑换码为：{{ rewardData.verifyCode }}；</li>
                    <li>2、在个人中心可以查看您的中奖信息，<a @click="toSpaPage('lucky')">立即查看</a>；</li>
                    <li>3、请在活动时间内，及时兑换您的奖品，活动时间：{{ actStartTime }}至{{ actEndTime }}</li>
                    <li>4、最终解释权，归<a @click="toSpaPage('home')">{{ clubName }}</a>所有。</li>
                </ul>
                <div class="close-btn" @click="closePopModal('material')">&times;</div>
            </div>
        </div>
        <!-- 中奖 积分弹窗 -->
        <div class="pop-modal winning material" :class="{ active: popData.integral }" @click="closePopModal('integral')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap" v-if="rewardData && rewardData.type==0">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>{{ rewardData.content }} 积分</h2>
                    <div class="btn" @click="doClickShareBtn('integral')"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc" v-if="rewardData && rewardData.type==0">
                    <li>1、在个人中心可以查看您的中奖信息，<a @click="toSpaPage('lucky')">立即查看</a>；</li>
                    <li>2、请在活动时间内，及时兑换您的奖品，活动时间：{{ actStartTime }}至{{ actEndTime }}</li>
                    <li>3、最终解释权，归<a @click="toSpaPage('home')">{{ clubName }}</a>所有。</li>
                </ul>
                <div class="close-btn" @click="closePopModal('integral')">&times;</div>
            </div>
        </div>
        <!-- 中奖 优惠券 -->
        <div class="pop-modal winning coupon" :class="{ active: popData.coupon }" @click="closePopModal('coupon')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <div class="coupon" v-if="rewardData && rewardData.type==2">
                        <div>{{ rewardData.cardInfo.cardName }}</div>
                        <div>{{ rewardData.cardInfo.useConditions }}</div>
                        <div>券有效期：{{ rewardData.cardInfo.startTime }}至{{ rewardData.cardInfo.endTime }}</div>
                        <div>{{ rewardData.cardInfo.cardType }}</div>
                    </div>
                    <div class="btn" @click="doClickShareBtn('coupon')"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc">
                    <li>1、请及时使用您的优惠券，<a @click="toSpaPage('coupon')">立即使用</a></li>
                    <li>2、在个人中心可以查看您的中奖信息，<a @click="toSpaPage('lucky')">立即查看</a>；</li>
                    <li>3、最终解释权，归<a @click="toSpaPage('home')">{{ clubName }}</a>所有。</li>
                </ul>
                <div class="close-btn" @click="closePopModal('coupon')">&times;</div>
            </div>
        </div>
        <!-- 中奖 项目券 -->
        <div class="pop-modal winning coupon" :class="{ active: popData.serviceItem }" @click="closePopModal('serviceItem')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <div class="coupon" v-if="rewardData && rewardData.type==3">
                        <div>{{ rewardData.cardInfo.cardName }}</div>
                        <div>{{ rewardData.cardInfo.useConditions }}</div>
                        <div>券有效期：{{ rewardData.cardInfo.startTime }}至{{ rewardData.cardInfo.endTime }}</div>
                        <div>{{ rewardData.cardInfo.cardType }}</div>
                    </div>
                    <div class="btn" @click="doClickShareBtn('serviceItem')"></div>
                </div>
                <split-line type="red"></split-line>
                <ul class="act-desc">
                    <li>1、请及时使用您的优惠券，<a @click="toSpaPage('coupon')">立即使用</a></li>
                    <li>2、在个人中心可以查看您的中奖信息，<a @click="toSpaPage('lucky')">立即查看</a>；</li>
                    <li>3、最终解释权，归<a @click="toSpaPage('home')">{{ clubName }}</a>所有。</li>
                </ul>
                <div class="close-btn" @click="closePopModal('serviceItem')">&times;</div>
            </div>
        </div>
        <!-- 中奖 再抽一次 -->
        <div class="pop-modal winning again" :class="{ active: popData.again }" @click="closePopModal('again')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap">
                    <h3>中奖啦！</h3>
                    <h4>恭喜您获得：</h4>
                    <h2>再抽一次的机会</h2>
                    <div class="btn" @click="doClickAgainBtn()"></div>
                </div>
                <div class="close-btn" @click="closePopModal('again')">&times;</div>
            </div>
        </div>
        <!-- 未中奖 分享可再抽一次 -->
        <div class="pop-modal no-winning" :class="{ active: popData.canShare }" @click="closePopModal('canShare')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap">
                    <h3>非常遗憾！</h3>
                    <h4>谢谢您的参与，非常抱歉没能中奖！</h4>
                    <div class="cry"></div>
                    <div class="tip">分享活动，再抽<b>1</b>次</div>
                    <div class="btn" @click="doClickShareBtn('canShare')"></div>
                </div>
                <split-line type="white"></split-line>
                <div class="act-desc">注：活动时间，每天都有{{ everyDayLotteryCount }}次机会</div>
                <div class="close-btn" @click="closePopModal('canShare')">&times;</div>
            </div>
        </div>
        <!-- 未中奖 没有抽奖机会 -->
        <div class="pop-modal no-winning" :class="{ active: popData.noChance }" @click="closePopModal('noChance')">
            <div class="center-wrap" @click="doClickPopWrap($event)">
                <div class="top-wrap">
                    <h3>非常遗憾！</h3>
                    <h4>谢谢您的参与，非常抱歉没能中奖！</h4>
                    <div class="cry"></div>
                    <div class="tip" v-show="currLotteryCount==0">明天再来抽<b>{{ everyDayLotteryCount }}</b>次</div>
                    <div class="btn" :class="{ again: currLotteryCount>0 }" @click="doClickShareBtn('noChance', currLotteryCount>0)"></div>
                </div>
                <split-line type="white"></split-line>
                <div class="act-desc">注：活动时间，每天都有{{ everyDayLotteryCount }}次机会</div>
                <div class="close-btn" @click="closePopModal('noChance')">&times;</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Global } from './libs/global'
    import { eventHub } from './libs/hub'
    import SplitLine from './components/splitLine'
    import Share from './components/share'

    module.exports = {
        components: {
            'split-line': SplitLine,
            'share': Share
        },
        data: function () {
            return {
                loading: true,
                loadError: false,
                loadErrorTip: '',
                clubName: '', // 会所名称
                clubId: '', // 会所ID
                clubLogo: '', // 会所logo

                currRotateDeg: 0, // 当前旋转的度数
                needRotateDeg: 0, // 当点击抽奖之后，转盘需要旋转的度数
                needRotateDuration: 5, // 旋转的时间
                inRotating: false, // 是否正在旋转抽奖中
                rewardGift: null, // 当前所中的奖品
                rewardData: null, // 中奖之后后端返回的数据
                everyDayLotteryCount: 2, // 每天默认的可抽奖次数
                currLotteryCount: 0, // 当前的抽奖次数
                hasShared: false, // 是否已经分享了

                actName: '幸运大转盘',
                actId: '',
                actDesc: '', // 活动说明
                actStartTime: '', // 活动开始时间
                actEndTime: '', // 活动结束时间
                giftMap: ['integral', 'material', 'coupon', 'serviceItem', 'again', 'none'],
                giftList: [],
                recordList: [], // 中奖纪录

                popData: { // 控制弹窗的对象
                    material: false, // 中奖 实物弹窗
                    integral: false, // 中奖 积分弹窗
                    coupon: false, // 中奖 优惠券
                    serviceItem: false, // 中奖 项目券
                    again: false, // 中奖 再抽一次
                    canShare: false, // 未中奖 分享可再抽一次
                    noChance: false // 未中奖 没有抽奖机会
                }
            }
        },
        mounted: function () {
            var that = this
            var global = Global
            var pageParams = global.pageParams

            that.actId = pageParams.actId
            that.clubId = pageParams.clubId
            global.clubId = that.clubId

            if (!that.actId) {
                return that.toBack('页面缺少访问参数！')
            } else if (!global.userToken || !global.userId) {
                global.tipShow('请您先登录！')
                setTimeout(function () {
                    global.sessionStorage('spa_login_luckyWheel', that.actId)
                    that.toSpaPage('login')
                }, 500)
                return
            }

            that.$http.get('../api/v2/user/luckyWheel/toActMain', {params: {actId: pageParams.actId}}).then(function (res) {
                res = res.body
                if (res.statusCode == 200) {
                    res = res.respData
                    var act = res.activity
                    that.actName = act.name
                    that.actId = act.id
                    that.actDesc = act.description
                    that.actStartTime = act.startTime
                    that.actEndTime = act.endTime
                    that.currLotteryCount = res.drawChance // 剩余抽奖机会
                    if (that.currLotteryCount < 0) {
                        that.currLotteryCount = 0
                    }

                    var club = res.club
                    global.clubId = that.clubId = club.clubId
                    that.clubName = club.clubName
                    that.clubLogo = club.clubLogo || './images/logo.png'

                    var prizeList = res.prizeList
                    var giftList = []
                    var prize
                    for (var k = 0; k < prizeList.length; k++) {
                        prize = prizeList[k]
                        giftList.push({
                            id: prize.prizeId,
                            name: prize.prizeName,
                            type: that.giftMap[prize.prizeType],
                            deg: 0
                        })
                    }
                    that.giftList = giftList
                    that.recordList = res.recordList
                    that.init()

                    // 分享配置
                    global.shareConfig({
                        title: that.actName,
                        desc: '那一世转山转水，只为相见，点我立即开始',
                        link: location.href,
                        imgUrl: that.clubLogo,
                        success: function () {
                            if (!that.hasShared) { // 未分享过，抽奖机会+1
                                that.$http.get('../api/v2/user/luckyWheel/shareAddDrawChance', {params: {actId: that.actId}}).then(function (sharedRes) {
                                    sharedRes = sharedRes.body
                                    if (sharedRes.statusCode == 200) {
                                        that.currLotteryCount ++
                                        that.hasShared = true
                                        global.localStorage(global.userId + '-' + that.actId, (+new Date()))
                                    }
                                })
                            }
                        }
                    })

                    // 判断是否已分享了
                    var lastSharedTime = global.localStorage(global.userId + '-' + that.actId)
                    if (lastSharedTime) {
                        lastSharedTime = new Date(lastSharedTime)
                        var currDate = new Date()
                        if (lastSharedTime.getFullYear() == currDate.getFullYear() && lastSharedTime.getMonth() == currDate.getMonth() && lastSharedTime.getDate() == currDate.getDate()) {
                            that.hasShared = true // 今天已经分享过了
                        }
                    }

                    that.$refs.spinner.classList.remove('act')
                    // sessionStorage.removeItem('spa_login_luckyWheel')
                } else {
                    // global.tipShow(res.msg || '数据请求异常！')
                    if (res.msg) {
                        that.loadErrorTip = res.msg
                    }
                    that.loadError = true
                }
            }, function () {
                that.toBack('数据请求异常！')
            })
        },
        methods: {
            doLoadingHide: function () {
                var that = this
                that.loading = false
                setTimeout(function () {
                    // 初始动画
                    var aniEls = that.$el.querySelectorAll('.ani')
                    for (var i = 0; i < aniEls.length; i++) {
                        aniEls[i].classList.add('act')
                    }
                }, 0)
            },
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

                var pointerRadial = pointerCtx.createRadialGradient(pointerPanRadius, pointerCenter, 0, pointerPanRadius, pointerCenter, pointerPanRadius - 25)
                pointerRadial.addColorStop(0, '#f5385f')
                pointerRadial.addColorStop(0.75, '#f5385f')
                pointerRadial.addColorStop(0.82, '#eb1244')
                pointerRadial.addColorStop(1, '#eb1244')

                pointerCtx.fillStyle = pointerRadial
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
                var that = this
                that.popData[popName] = false
            },
            doClickPopWrap: function (event) {
                event.stopPropagation()
            },
            doClickLotteryBtn: function () { // 点击抽奖按钮
                var that = this
                var global = Global
                if (that.inRotating) {
                    return global.tipShow('抽奖中...')
                }
                if (that.currLotteryCount == 0) {
                    return global.tipShow('当前您的剩余抽奖次数为0！')
                }
                that.$http.post('../api/v2/user/luckyWheel/drawLuckyWheel', {actId: that.actId}).then(function (res) {
                    res = res.body
                    if (res.statusCode == 200) {
                        res = res.respData
                        var giftList = that.giftList
                        for (var k = 0; k < giftList.length; k++) {
                            if (giftList[k].id == res.id) {
                                that.rewardGift = giftList[k]
                                break
                            }
                        }
                        if (that.rewardGift) {
                            var verifyCode = res.verifyCode
                            if (verifyCode && verifyCode.length == 12) {
                                res.verifyCode = verifyCode.substr(0, 4) + ' ' + verifyCode.substr(4, 4) + ' ' + verifyCode.slice(-4)
                            }
                            that.rewardData = res
                            that.inRotating = true
                            var deltDeg = 360 * 3 + that.rewardGift.deg - that.currRotateDeg % 360
                            that.needRotateDuration = 0.75 * (deltDeg / 180)
                            that.needRotateDeg = that.currRotateDeg + deltDeg
                            console.log('needRotateDeg：' + that.needRotateDeg + 'deltDeg：' + deltDeg + 'duration：' + that.needRotateDuration)
                            that.currRotateDeg = that.needRotateDeg
                        } else {
                            global.tipShow('抽奖结果异常！')
                        }
                    }
                })
            },
            doHandlerRotateEnd: function () { // 转盘旋转结束的处理
                var that = this
                var global = Global
                if (that.inRotating) {
                    that.inRotating = false
                    that.currLotteryCount -- // 抽奖次数-1
                    var rewardType = that.rewardGift.type
                    console.log('当前的中奖：' + that.rewardGift.name)
                    var popData = that.popData
                    if (/^(material|integral|coupon|again|serviceItem)$/.test(rewardType)) {
                        popData[rewardType] = true
                        if (rewardType != 'again') { // 添加中奖纪录
                            var recordList = that.recordList
                            var newRecord = {
                                userName: global.userName
                            }
                            var rewardData = that.rewardData
                            if (rewardType == 'material') {
                                newRecord.prizeName = that.rewardGift.name
                            } else if (rewardType == 'integral') {
                                newRecord.prizeName = rewardData.content + '积分'
                            }

                            if (recordList.length == 3) {
                                recordList.shift()
                            }
                            recordList.push(newRecord)
                        }
                    } else if (rewardType == 'none') { // 未能中奖
                        if (that.currLotteryCount > 0) { // 还有可抽奖次数
                            popData.noChance = true
                        } else if (!that.hasShared) { // 还未分享，分享可再抽一次
                            popData.canShare = true
                        } else {
                            popData.noChance = true
                        }
                    }
                    if (rewardType == 'again') { // 抽中再来一次，抽奖次数+1
                        that.currLotteryCount ++
                    }
                }
            },
            doClickShareBtn: function (popName, again) { // 点击分享按钮
                var that = this
                var global = Global
                that.popData[popName] = false
                if (again && popName == 'noChance' && that.currLotteryCount > 0) { // 未中奖，点击再抽一次
                    that.doClickLotteryBtn()
                } else {
                    if (global.userAgent.isWX) {
                        eventHub.$emit('change-share-pop', true)
                    } else {
                        global.tipShow('请在微信中打开并分享！')
                    }
                }
            },
            doClickAgainBtn: function () { // 点击再抽一次按钮
                var that = this
                that.popData.again = false
                that.doClickLotteryBtn() // 再次抽取一次
            },
            toBack: function (str) {
                if (str) {
                    var global = Global
                    global.tipShow(str)
                    setTimeout(function () {
                        history.back()
                    }, 1000)
                } else {
                    history.back()
                }
            },
            toSpaPage: function (pageName) { // 跳转回SPA页面
                Global.toSpaPage(pageName)
            }
        }
    }
</script>