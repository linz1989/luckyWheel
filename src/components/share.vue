<template>
    <div class="share-pop pop-modal" :class="{ active : show }" @click="doChange(false)">
        <div v-if="global.userAgent.isWX" @click="doClickWrap($event)" class="top">发送给朋友或者分享到朋友圈</div>
    </div>
</template>

<script>
    import { Global } from '../libs/global'
    import { eventHub } from '../libs/hub'

    module.exports = {
        data: function () {
            return {
                global: Global,
                show: false
            }
        },
        props: {
            shareUrl: {
                type: String,
                required: true
            }
        },
        created: function () {
            eventHub.$on('change-share-pop', this.doChange)
        },
        methods: {
            doChange: function (type) {
                this.show = type
            },
            doClickWrap: function (event) {
                event.stopPropagation()
            }
        },
        beforeDestroy: function () {
            eventHub.$off('change-share-pop', this.doChange)
        }
    }
</script>