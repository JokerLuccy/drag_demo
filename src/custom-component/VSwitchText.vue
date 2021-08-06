<template>
    <div ref="vSwitchText" class="v-switch-text">
        <span v-for="(item, index) in getPropValue" :key="index" :class="{ [item]: item.startsWith('icon') ? item : '', active: currentContext === item ? 'active' : '' }" class="iconfont">{{ item.startsWith('icon') ? '' : item }}</span>
        <div ref="circle" :style="{ left: vSwitchWidth - circleWidth + 'px' }" class="circle"></div>
    </div>
</template>

<script>
import vm from '@/utils/eventBus'

export default {
    name: 'VSwitchText',
    data() {
        return {
            circleWidth: 0,
            vSwitchWidth: 0,
            currentContext: '',
        }
    },
    props: {
        element: {
            type: Object,
        },
    },
    computed: {
        // 计算应该移动的距离
        getMoveDistance() {
            let circleWidth = this.$refs.circle.offsetWidth,
                vSwitchWidth = this.$refs.vSwitchText.offsetWidth
            return vSwitchWidth - circleWidth
        },
        getPropValue() {
            return JSON.parse(this.element.propValue)
        },
    },
    watch: {
        'element.data.flag': {
            handler(newVal) {
                if (newVal) {
                    this.$refs.circle.style.left = 0 + 'px'
                    this.currentContext = this.getPropValue[0]
                } else {
                    this.$refs.circle.style.left = this.getMoveDistance + 'px'
                    this.currentContext = this.getPropValue[1]
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
    created() {},
    mounted() {
        this.circleWidth = this.$refs.circle.offsetWidth
        this.vSwitchWidth = this.$refs.vSwitchText.offsetWidth
        this.currentContext = this.getPropValue[1]
    },
}
</script>

<style lang="scss" scoped>
.v-switch-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 5;
    color: #2ebef3;
    span {
        transition: all 0.2s ease-in-out;
    }
    .circle {
        z-index: -1;
        position: absolute;
        width: 40px;
        height: 100%;
        background: #2ebef3;
        border-radius: 14px;
        opacity: 1;
        transition: all 0.2s ease-in-out;
        top: 0;
    }
    .active {
        color: #fff;
    }
}
</style>
