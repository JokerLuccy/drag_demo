<template>
    <div @click="handleClick">
        <component :is="config.component" :element="config" :propValue="config.propValue" :style="getStyle(config.style)" class="component" />
    </div>
</template>

<script>
import { getStyle } from '@/utils/style'
import runAnimation from '@/utils/runAnimation'
import { mixins } from '@/utils/events'
import vm from '@/utils/eventBus'

export default {
    props: {
        config: {
            type: Object,
            require: true,
        },
    },

    mounted() {
        runAnimation(this.$el, this.config.animations)
        vm.$on('vTitleLeftClick', this.handleLeftClick)
        vm.$on('vTitleRightClick', this.handleRightClick)
        vm.$on('change', this.handleChange)
    },
    mixins: [mixins],
    methods: {
        getStyle,
        handleClick() {
            const events = this.config.events
            Object.keys(events).forEach(event => {
                this[event](events[event])
            })
        },
        // 切换开关状态
        handleSwitch() {
            this.config.data.flag = !this.config.data.flag
        },
        handleLeftClick() {
            console.log('左侧图标触发')
        },
        handleRightClick() {
            console.log('右侧图标触发')
        },
        handleChange() {
            console.log('开关出啊发')
        },
    },
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>
