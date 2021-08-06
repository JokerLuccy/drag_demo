<template>
    <div ref='vSwitch' class="v-switch">
        <div ref="circle" :style="{ left:element.style.width-27 + 'px' }" class="circle"></div>
    </div>
</template>

<script>
import vm from '@/utils/eventBus'

export default {
    name: 'VSwitch',
    props: {
        element: {
            type: Object,
        },
    },
    computed: {
        // 计算应该移动的距离
        getMoveDistance() {
            let circleWidth = this.$refs.circle.offsetWidth,
                vSwitchWidth = this.$refs.vSwitch.offsetWidth
            return vSwitchWidth - circleWidth
        },
    },
    watch: {
        'element.data.flag': {
            handler(newVal) {
                if (newVal) {
                    this.$refs.circle.style.left = 0 + 'px'
                } else {
                    this.$refs.circle.style.left = this.getMoveDistance + 'px'
                }
                this.handleChange()
            },
        },
    },
    methods: {
        // 开关发生改变时触发回调
        handleChange() {
            vm.$emit('change')
        },
    },

}
</script>

<style lang='scss' scoped>
.v-switch {
    position: relative;
    .circle {
        position: absolute;
        width: 27px;
        height: 100%;
        background: #ffffff;
        border: 1px solid #2ebef3;
        box-shadow: -3px 1px 2px rgba(25, 143, 186, 0.15);
        border-radius: 50%;
        opacity: 1;
        transition: all 0.2s ease-in-out;
        top: 0;
    }
}
</style>
