<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
    <div class="attr-list">
        <el-form>
            <!-- 遍历style里面的key -->
            <el-form-item v-for="(key, index) in styleKeys.filter(item => item !== 'rotate')" :key="index" :label="map[key]">
                <!--颜色选择器-->
                <el-color-picker v-if="key === 'borderColor'" v-model="curComponent.style[key]"></el-color-picker>
                <el-color-picker v-else-if="key === 'color'" v-model="curComponent.style[key]"></el-color-picker>
                <el-color-picker v-else-if="key === 'backgroundColor'" v-model="curComponent.style[key]"></el-color-picker>
                <!--下拉选择框 可选项就是 selectKey 里面的项目-->
                <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
                    <template v-if="key === 'textAlign'">
                        <el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                    <template v-else-if="key === 'borderStyle'">
                        <el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                    <template v-else-if="key === 'type'">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                    <template v-else>
                        <el-option v-for="item in verticalAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                </el-select>
                <el-input v-else-if="key === 'boxShadow'" v-model="curComponent.style[key]" type="text"></el-input>
                <!--数字输入框-->
                <el-input v-else v-model="curComponent.style[key]" type="number" />
            </el-form-item>

            <!-- 遍历data.config里面的key 进行相关配置 -->
            <template v-if="Object.keys(curComponent.data.config).length">
                <el-form-item v-for="(key, index) in configKeys" :key="index + '1'" :label="configMap[key]">
                    <el-select v-if="configSelectKey.includes(key)" v-model="curComponent.data.config[key]">
                        <template v-if="key === 'position'">
                            <el-option v-for="key in titlePositionOptions" :key="key.value" :label="key.label" :value="key.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </template>

            <!-- Text 内容输入框-->
            <el-form-item v-if="curComponent && !excludes.includes(curComponent.component)" label="内容">
                <el-input v-model="curComponent.propValue" type="textarea" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            excludes: ['Picture', 'Group'], // 这些组件不显示内容
            textAlignOptions: [
                {
                    label: '左对齐',
                    value: 'left',
                },
                {
                    label: '居中',
                    value: 'center',
                },
                {
                    label: '右对齐',
                    value: 'right',
                },
            ],
            borderStyleOptions: [
                {
                    label: '实线',
                    value: 'solid',
                },
                {
                    label: '虚线',
                    value: 'dashed',
                },
            ],
            verticalAlignOptions: [
                {
                    label: '上对齐',
                    value: 'top',
                },
                {
                    label: '居中对齐',
                    value: 'middle',
                },
                {
                    label: '下对齐',
                    value: 'bottom',
                },
            ],
            typeOptions: [
                { label: '密码', value: 'password' },
                { label: '数字', value: 'number' },
                {
                    label: '文本',
                    value: 'text',
                },
            ],
            titlePositionOptions: [
                { label: '左侧', value: 'left' },
                { label: '右侧', value: 'right' },
                { label: '居中', value: 'center' },
            ],
            selectKey: ['textAlign', 'borderStyle', 'verticalAlign', 'type'],
            configSelectKey: ['position'],
            // 通过curComponent 里面的key 做label(提示) curComponent的key 和 map 的key 必须保持一致
            map: {
                left: 'x 坐标',
                top: 'y 坐标',
                height: '高',
                width: '宽',
                color: '颜色',
                backgroundColor: '背景色',
                borderStyle: '边框风格',
                borderWidth: '边框宽度',
                borderColor: '边框颜色',
                borderRadius: '边框半径',
                boxShadow: '边框阴影',
                fontSize: '字体大小',
                fontWeight: '字体粗细',
                lineHeight: '行高',
                letterSpacing: '字间距',
                opacity: '透明度',
                textAlign: '左右对齐',
                verticalAlign: '上下对齐',
                type: '类型',
            },
            configMap: {
                position: '标题位置',
            },
        }
    },
    computed: {
        // 获取各项配置信息
        styleKeys() {
            return this.$store.state.curComponent ? Object.keys(this.$store.state.curComponent.style) : []
        },
        configKeys() {
            return this.$store.state.curComponent ? Object.keys(this.$store.state.curComponent.data.config) : []
        },
        curComponent() {
            return this.$store.state.curComponent
        },
    },
}
</script>

<style lang="scss" scoped>
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
</style>
