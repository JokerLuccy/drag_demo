<template>
    <input :type="element.style.type" class="v-input" aria-placeholder="请输入内容" :value="propValue">
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
