import Vue from 'vue'
// 组件名和文件名保持一致
const components = ['Picture', 'VText', 'VButton', 'Group', 'RectShape', 'VInput', 'VIcon', 'VSwitch', 'VSwitchText', 'VTitle']

components.forEach(key => {
    Vue.component(key, () => import(`@/custom-component/${key}`))
})
