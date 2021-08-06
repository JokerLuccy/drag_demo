<template>
    <div class="iconfont" :class="propValue"></div>
</template>

<script>
export default {
    props: {
        propValue: {
            type: String,
            default: '',
        },
        element: {
            type: Object,
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
