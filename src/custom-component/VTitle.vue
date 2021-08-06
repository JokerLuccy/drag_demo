<template>
    <div class="v-title">
        <span @click="handleLeftClick" class="left-icon iconfont" :class="getPropValue.left"></span>
        <div class="center-context" :style="{ textAlign: element.data.config.position }">{{ getPropValue.center }}</div>
        <span @click="handleRightClick" class="right-icon iconfont" :class="getPropValue.right"></span>
    </div>
</template>

<script>
import vm from '@/utils/eventBus.js'

export default {
    name: 'VTitle',
    props: {
        element: {
            type: Object,
        },
    },
    computed: {
        getPropValue() {
            return JSON.parse(this.element.propValue)
        },
    },
    methods: {
        // 左侧icon点击事件
        handleLeftClick() {
            vm.$emit('vTitleLeftClick')
        },
        handleRightClick() {
            vm.$emit('vTitleRightClick')
        },
    },
    // 释放内存
    beforeDestroy() {
        this.element.callBackEvents.forEach(v => {
            vm.$off(v)
        })
    },
}
</script>

<style lang="scss" scoped>
.v-title {
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    align-items: center;
    .left-icon,
    .right-icon {
        width: 14px;
        height: 14px;
    }
    .center-context {
        box-sizing: border-box;
        padding-left: 10px;
        flex-grow: 1;
        // text-align: center;
    }
}
</style>
