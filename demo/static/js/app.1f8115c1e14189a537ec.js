webpackJsonp([1,0],[function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(2),o=n(a),r=i(10),s=n(r),l=i(6),c=n(l),d=i(1);d.Global.init(),o.default.use(s.default),o.default.http.options.emulateJSON=!0,window._g=d.Global,o.default.http.interceptors.push(function(t,e){"get"===t.method.toLowerCase()&&(t.params._=+new Date),e(function(t){return t})}),new o.default({el:"#app",render:function(t){return t(c.default)}})},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(2),o=n(a),r=i(11);e.Global={pageParams:{},tip:null,app:null,baseWidth:null,winWidth:null,winHeight:null,winScale:1,userAgent:{isWX:!1,isiPhone:!1},init:function(){var t=navigator.userAgent.toLowerCase(),e=this,i=e.userAgent;window.addEventListener("resize",function(){e.resizeWin()}),e.resizeWin(),i.isWX=/micromessenger/.test(t),i.isiPhone=/iPhone/i.test(t),e.tip=document.querySelector("#app-tip");var n=location.href.split("?");if(n[1])for(var a,o=n[1].split("&"),r=0;r<o.length;r++)a=o[r].split("="),2===a.length&&(e.pageParams[a[0]]=a[1])},resizeWin:function(){var t=this,e=window,i=document,n=i.documentElement;t.baseWidth||(t.baseWidth=i.body.clientWidth||320),t.winWidth=n.clientWidth||e.innerWidth||i.body.clientWidth,t.winHeight=n.clientHeight||e.innerHeight,t.winWidth=t.winWidth>540?540:t.winWidth<320?320:t.winWidth,t.winScale=t.winWidth/t.baseWidth,n.style.fontSize=16*t.winScale+"px",n.style.backgroundColor="#f0f0f0",document.querySelector("body").style.minHeight=t.winHeight+"px"},tipShow:function(t,e){var i=this.tip;i||(i=this.tip=document.querySelector("#app-tip")),i.children[0].innerHTML=t,i.classList.add("active"),setTimeout(function(){i.classList.remove("active")},e||3e3)},localStorage:function(t){function e(e,i){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e){return e?void localStorage.setItem(t,e):localStorage.getItem(t)}),sessionStorage:function(t){function e(e,i){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e){return e?void sessionStorage.setItem(t,e):sessionStorage.getItem(t)}),shareConfig:function(t){var e=window,i=this;r&&(t=t||{},r.signReady?t.title?(r.hideMenuItems({menuList:["menuItem:copyUrl"]}),r.showAllNonBaseMenuItem(),r.onMenuShareAppMessage(t),r.onMenuShareTimeline(t),r.onMenuShareQQ(t),r.onMenuShareWeibo(t),r.onMenuShareQZone(t)):r.hideAllNonBaseMenuItem():(e.requestSignCount=2,i.weiXinCfgSignature(t)))},weiXinCfgSignature:function(t){var e=location,i=e.origin+e.pathname+e.search,n=window,a=this;o.default.http.get("../api/v1/wx/sign",{params:{url:encodeURIComponent(i),sessionType:"9358"}}).then(function(e){e=e.body,r.config({debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","hideMenuItems"]}),n.wxError||(n.wxError=!0,r.error(function(){r.signReady=!1,n.requestSignCount--,0!==n.requestSignCount&&a.weiXinCfgSignature()})),n.wxReady||(n.wxReady=!0,r.ready(function(){r.signReady=!0,a.shareConfig(t)}))})}}},,function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(1),o=i(7),r=n(o);t.exports={components:{"split-line":r.default},data:function(){return{loading:!0,loadError:!1,currRotateDeg:0,needRotateDeg:0,needRotateDuration:5,inRotating:!1,rewardGift:"",totalLotteryCount:20,currLotteryCount:20,hasShared:!1,giftList:[{name:"移动电源",type:"material",deg:0},{name:"¥100元现金券",type:"coupon",deg:0},{name:"谢谢惠顾",type:"none",deg:0},{name:"iphone 6s",type:"material",deg:0},{name:"50元泰式按摩券",type:"coupon",deg:0},{name:"再来一次",type:"again",deg:0}],popData:{material:!1,coupon:!1,again:!1,canShare:!1,noChance:!1}}},mounted:function(){var t=this;t.$nextTick(function(){setTimeout(function(){t.init(),t.loading=!1},2e3)})},methods:{init:function(){var t=this,e=Math.PI,i=t.$refs.lightBg.getContext("2d"),n=756,a=24,o=360/(2*a)*(e/180),r=0,s=i.createLinearGradient(0,0,0,n);s.addColorStop(0,"rgba(255,255,255,.06)"),s.addColorStop(1,"rgba(255,255,255,.1)"),i.fillStyle=s,i.moveTo(n,n);for(var l=0;l<a/2;l++)i.lineTo(n+n*Math.cos(r),n-n*Math.sin(r)),r+=o,i.lineTo(n+n*Math.cos(r),n-n*Math.sin(r)),i.lineTo(n,n),r+=o;i.fill();var c=i.createLinearGradient(0,0,0,n);for(c.addColorStop(0,"rgba(255,255,255,.1)"),c.addColorStop(1,"rgba(255,255,255,.05)"),i.fillStyle=c,i.moveTo(n,n),l=a/2;l<a;l++)i.lineTo(n+n*Math.cos(r),n-n*Math.sin(r)),r+=o,i.lineTo(n+n*Math.cos(r),n-n*Math.sin(r)),i.lineTo(n,n),r+=o;i.fill();var d=t.$refs.wheel.getContext("2d");d.strokeStyle="#ffb534",d.lineWidth=8,d.arc(331,331,323,0,2*e),d.stroke(),d.beginPath(),d.strokeStyle="#de910d",d.fillStyle="#f8d300",d.lineWidth=1,d.arc(331,331,319,0,2*e),d.stroke(),d.fill(),d.beginPath(),d.strokeStyle="#d28500",d.lineWidth=11,d.arc(331,331,289,0,2*e),d.stroke();var u=6,h=8,f=307;for(o=20*(e/180),r=e/2,d.fillStyle="#fff",l=0;l<9;l++)d.beginPath(),d.arc(331+Math.cos(r)*f,331-Math.sin(r)*f,u,0,2*e),d.fill(),r+=o,d.beginPath(),d.arc(331+Math.cos(r)*f,331-Math.sin(r)*f,h,0,2*e),d.fill(),r+=o;var p=t.giftList,g=[{color:"#b92401",bgColor:"#fff6e5"},{color:"#590202",bgColor:"#ffd488"},{color:"#b92401",bgColor:"#fee0d5"}];o=360/p.length*(e/180);var v=360/p.length,m=283;r=e/2;var C,w=90;d.font="bold 44px 微软雅黑";var S=2*e*m*.58/p.length;d.textAlign="center",d.textBaseline="middle";var y,b,T,M,x,E;for(l=0;l<p.length;l++)E=p[l],d.beginPath(),d.moveTo(331,331),d.arc(331,331,m,r,r+o),d.lineTo(331,331),C=g[l%3],d.fillStyle=C.bgColor,d.fill(),d.closePath(),E.deg=w+v/2,E.deg>360&&(E.deg=E.deg-360),E.deg<270?E.deg=270-E.deg:E.deg=360-(E.deg-270),d.fillStyle=C.color,d.save(),d.translate(331,331),d.rotate(r+o/2+e/2),y=p[l].name,d.measureText(y).width>S?(x=y.split(" "),2==x.length?(b=x[0],T=x[1]):(M=t.getTextSplitPos(y,d,S),b=y.substr(0,M),T=y.substr(M)),d.fillText(b,0,.72*-m,S),d.fillText(T,0,.52*-m,S)):d.fillText(y,0,.65*-m),d.restore(),r+=o,w+=v;console.dir(p);var P=t.$refs.pointer.getContext("2d");P.fillStyle="#ffa406";var R=79,W=210-R;P.arc(R,W,R,0,2*e),P.fill(),P.beginPath();var D=80,_=64;P.fillStyle="#eb1244",P.moveTo(R,0),P.lineTo(R-_/2,D),P.lineTo(R,D),P.lineTo(R,0),P.closePath(),P.fill(),P.fillStyle="#b9072f",P.beginPath(),P.moveTo(R,0),P.lineTo(R+_/2,D),P.lineTo(R,D),P.lineTo(R,0),P.closePath(),P.fill(),P.beginPath(),P.fillStyle="#fa5f75",P.arc(R,W,R-15,0,2*e),P.closePath(),P.fill(),P.beginPath();var k=P.createRadialGradient(R,W,0,R,W,R-25);k.addColorStop(0,"#f5385f"),k.addColorStop(.75,"#f5385f"),k.addColorStop(.82,"#eb1244"),k.addColorStop(1,"#eb1244"),P.fillStyle=k,P.arc(R,W,R-25,0,2*e),P.closePath(),P.fill(),P.font="bold 36px 微软雅黑",P.textAlign="center",P.textBaseline="middle",P.fillStyle="#fff",P.fillText("点击",R,W-24),P.fillText("抽奖",R,W+16)},getTextSplitPos:function(t,e,i){if(t.length<=3)return t.length;if(/^[\u4E00-\u9FFF]+$/.test(t))return Math.ceil(t.length/2);for(var n=t.substr(0,3),a=3;a<t.length;a++)if(n+=t.charAt(a),e.measureText(n).width>i)return a+1;return t.length},closePopModal:function(t){this.popData[t]=!1},doClickLotteryBtn:function(){var t=this;if(t.inRotating)return a.Global.tipShow("抽奖中...");if(0==t.currLotteryCount)return a.Global.tipShow("当前您的剩余抽奖次数为0！");var e=t.giftList;t.rewardGift=e[parseInt(Math.random()*e.length)],t.inRotating=!0;var i=1080+t.rewardGift.deg-t.currRotateDeg%360;t.needRotateDuration=.75*(i/180),t.needRotateDeg=t.currRotateDeg+i,console.log("needRotateDeg："+t.needRotateDeg+"deltDeg："+i+"duration："+t.needRotateDuration),t.currRotateDeg=t.needRotateDeg},doHandlerRotateEnd:function(){var t=this;if(t.inRotating){t.inRotating=!1,t.currLotteryCount--;var e=t.rewardGift.type;console.log("当前的中奖："+t.rewardGift.name),/^(material|coupon|again)$/.test(e)?t.popData[e]=!0:"none"==e&&(t.hasShared?t.popData.noChance=!0:t.popData.canShare=!0),"again"==e&&t.currLotteryCount++}}}}},function(t,e){"use strict";t.exports={props:{type:{type:String,required:!0}},mounted:function(){var t=this;t.$nextTick(function(){var e=t.$el.getContext("2d"),i=Math.PI;e.fillStyle="red"==t.type?"#f66":"#fff",e.moveTo(0,3),e.arc(0,22,19,-i/2,i/2),e.lineTo(0,41),e.lineTo(615,41),e.arc(615,22,19,i/2,1.5*i),e.lineTo(615,3),e.lineTo(0,3),e.fill(),e.beginPath(),e.lineWidth=3,e.strokeStyle="red"==t.type?"#f66":"#fff",e.moveTo(0,2),e.lineTo(615,2),e.closePath(),e.stroke(),e.beginPath(),e.moveTo(0,42),e.lineTo(615,42),e.closePath(),e.stroke(),e.moveTo(40,22),e.strokeStyle="#555",e.lineWidth=1,e.lineCap="round";for(var n=40;n<575;)e.beginPath(),e.moveTo(n,22),e.lineTo(n+3,22),e.closePath(),e.stroke(),n+=10})}}},function(t,e){},function(t,e,i){var n,a;i(5),n=i(3);var o=i(9);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},function(t,e,i){var n,a;n=i(4);var o=i(8);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("canvas",{staticClass:"split-line",attrs:{width:"615",height:"44"}})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("div",{staticClass:"lottery-page"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.loading&&!t.loadError,expression:"loading && !loadError"}],staticClass:"spinner"},[t._m(0)," ",t._m(1)," ",t._m(2)])," ",[e("canvas",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],ref:"lightBg",staticClass:"light-bg",attrs:{width:"1512",height:"1512"}})," ",e("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],staticClass:"page-title"})," ",e("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],staticClass:"counter-desc"},[e("div",["剩余",e("span",[t._s(t.currLotteryCount)]),"次抽奖机会"])])," ",e("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],staticClass:"wheel"},[e("canvas",{ref:"wheel",style:{transform:"rotate("+t.needRotateDeg+"deg)","transition-duration":t.needRotateDuration+"s"},attrs:{width:"662",height:"662"},on:{transitionend:function(e){t.doHandlerRotateEnd()}}})," ",e("canvas",{ref:"pointer",attrs:{width:"158",height:"210"},on:{click:function(e){t.doClickLotteryBtn()}}})])," ",e("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],staticClass:"list-wrap winning-list"},[t._m(3)," ",t._m(4)])," ",e("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading&&!t.loadError,expression:"!loading && !loadError"}],staticClass:"list-wrap desc-list"},[t._m(5)," ",t._m(6)])]," ",t.loadError?e("div",{staticClass:"page-error"},["404",e("br"),e("span",["您访问的页面不存在！"])]):t._e()," "," ",e("div",{staticClass:"pop-modal winning material",class:{active:t.popData.material}},[e("div",{staticClass:"center-wrap"},[t._m(7)," ",e("split-line",{attrs:{type:"red"}})," ",t._m(8)," ",e("div",{staticClass:"close-btn",on:{click:function(e){t.closePopModal("material")}}},["×"])])])," "," ",e("div",{staticClass:"pop-modal winning coupon",class:{active:t.popData.coupon}},[e("div",{staticClass:"center-wrap"},[t._m(9)," ",e("split-line",{attrs:{type:"red"}})," ",t._m(10)," ",e("div",{staticClass:"close-btn",on:{click:function(e){t.closePopModal("coupon")}}},["×"])])])," "," ",e("div",{staticClass:"pop-modal winning again",class:{active:t.popData.again}},[e("div",{staticClass:"center-wrap"},[t._m(11)," ",e("div",{staticClass:"close-btn",on:{click:function(e){t.closePopModal("again")}}},["×"])])])," "," ",e("div",{staticClass:"pop-modal no-winning",class:{active:t.popData.canShare}},[e("div",{staticClass:"center-wrap"},[t._m(12)," ",e("split-line",{attrs:{type:"white"}})," ",e("div",{staticClass:"act-desc"},["注：活动时间，每天都有2次机会"])," ",e("div",{staticClass:"close-btn",on:{click:function(e){t.closePopModal("canShare")}}},["×"])])])," "," ",e("div",{staticClass:"pop-modal no-winning",class:{active:t.popData.noChance}},[e("div",{staticClass:"center-wrap"},[e("div",{staticClass:"top-wrap"},[e("h3",["非常遗憾！"])," ",e("h4",["谢谢您的参与，非常抱歉没能中奖！"])," ",e("div",{staticClass:"cry"})," ",e("div",{staticClass:"tip"},["明天再来抽",e("b",[t._s(t.totalLotteryCount)]),"次"])," ",e("div",{staticClass:"btn"})])," ",e("split-line",{attrs:{type:"white"}})," ",e("div",{staticClass:"act-desc"},["注：活动时间，每天都有2次机会"])," ",e("div",{staticClass:"close-btn",on:{click:function(e){t.closePopModal("noChance")}}},["×"])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement;return e("div",{staticClass:"spinner-container container1"},[e("div",{staticClass:"circle1"})," ",e("div",{staticClass:"circle2"})," ",e("div",{staticClass:"circle3"})," ",e("div",{staticClass:"circle4"})])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"spinner-container container2"},[e("div",{staticClass:"circle1"})," ",e("div",{staticClass:"circle2"})," ",e("div",{staticClass:"circle3"})," ",e("div",{staticClass:"circle4"})])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"spinner-container container3"},[e("div",{staticClass:"circle1"})," ",e("div",{staticClass:"circle2"})," ",e("div",{staticClass:"circle3"})," ",e("div",{staticClass:"circle4"})])},function(){var t=this,e=t.$createElement;return e("h3",[e("span",["中"]),"奖名单"])},function(){var t=this,e=t.$createElement;return e("ul",[e("li",[e("div",["张小花"]),e("div",["恭喜您获得一瓶可乐"])])])},function(){var t=this,e=t.$createElement;return e("h3",[e("span",["活"]),"动说明"])},function(){var t=this,e=t.$createElement;return e("ul",[e("li",["1、活动时间2016-11-11至2016-12-12动时间2016-11-11至2016-12-12"])," ",e("li",["2、分享可获取一次抽奖机会"])," ",e("li",["3、分享可获取一次抽奖机会"])," ",e("li",["4、分享可获取一次抽奖机会"])])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"top-wrap"},[e("h3",["中奖啦！"])," ",e("h4",["恭喜您获得："])," ",e("h2",["iphone 6s"])," ",e("div",{staticClass:"btn"})])},function(){var t=this,e=t.$createElement;return e("ul",{staticClass:"act-desc"},[e("li",["1、您的兑换码为：11111111"])," ",e("li",["2、您的兑换码为：",e("a",["立即查看"])])," ",e("li",["3、您的兑换码为：11111111"])," ",e("li",["4、您的兑换码为：11111111"])])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"top-wrap"},[e("h3",["中奖啦！"])," ",e("h4",["恭喜您获得："])," ",e("div",{staticClass:"coupon"},[e("div",["198元"])," ",e("div",["满100元可用"])," ",e("div",["券有效期：2015-11-11至2016-12-12"])," ",e("div",["现金券"])])," ",e("div",{staticClass:"btn"})])},function(){var t=this,e=t.$createElement;return e("ul",{staticClass:"act-desc"},[e("li",["1、您的兑换码为：11111111"])," ",e("li",["2、您的兑换码为：",e("a",["立即查看"])])," ",e("li",["3、您的兑换码为：11111111"])," ",e("li",["4、您的兑换码为：11111111"])])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"top-wrap"},[e("h3",["中奖啦！"])," ",e("h4",["恭喜您获得："])," ",e("h2",["再抽一次的机会"])," ",e("div",{staticClass:"btn"})])},function(){var t=this,e=t.$createElement;return e("div",{staticClass:"top-wrap"},[e("h3",["非常遗憾！"])," ",e("h4",["谢谢您的参与，非常抱歉没能中奖！"])," ",e("div",{staticClass:"cry"})," ",e("div",{staticClass:"tip"},["分享活动，再抽",e("b",["1"]),"次"])," ",e("div",{staticClass:"btn"})])}]}}]);