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

        </template>
        <div v-if="loadError && errorId" class="page-error">404<br/><span>您访问的页面不存在！</span></div>
    </div>
</template>
<script>
    import { Global } from './libs/global'

    module.exports = {
        data: function () {
            return {
            }
        },
        mounted: function () {
            var _this = this
            _this.$nextTick(function () {
                Global.tipShow('幸运大抽奖大页面！')
            })
        },
        methods: {
            init: function () {

            }
        }
    }
</script>