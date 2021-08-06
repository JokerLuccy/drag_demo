// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
}

// 编辑器左侧组件列表 组合组件 要加一个 ref 字段 作为实例
const list = [
    {
        component: 'v-text',
        label: '文字',
        propValue: '双击编辑文字',
        icon: 'iconwenzi',
        data: { config: {} },
        style: {
            width: 200,
            height: 22,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
    {
        component: 'v-button',
        label: '按钮',
        propValue: '按钮',
        data: { config: {} },
        icon: 'iconanniu',
        style: {
            width: 100,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
            boxShadow: '',
        },
    },
    {
        component: 'rect-shape',
        label: '矩形',
        propValue: '&nbsp;',
        data: { config: {} },
        icon: 'iconjuxing',
        style: {
            width: 200,
            height: 200,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: '',
            backgroundColor: '',
            borderStyle: 'solid',
            verticalAlign: 'middle',
            boxShadow: '',
        },
    },
    {
        component: 'v-input',
        label: '输入框',
        propValue: '请输入内容',
        icon: 'iconshurukuang',
        data: { config: {} },
        style: {
            width: 200,
            height: 40,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '',
            borderWidth: 1,
            backgroundColor: '',
            borderStyle: '',
            verticalAlign: '',
            type: 'text',
            borderRadius: '',
        },
    },
    {
        component: 'v-icon',
        label: '图标',
        propValue: 'icontupian',
        icon: 'icontupian',
        data: { config: {} },
        style: {
            width: 14,
            height: 14,
            fontSize: 14,
            fontWeight: 500,
            color: 'red',
        },
    },
    {
        component: 'v-switch',
        label: '开关',
        propValue: '',
        icon: 'iconkaiguan',
        ref: 'vswitch',
        data: { flag: false, config: {} },
        callBackEvents: ['change'],
        style: {
            width: 51,
            height: 27,
            backgroundColor: '#2ebef3',
            borderRadius: 16,
        },
    },
    {
        component: 'v-switch-text',
        label: '文字开关',
        propValue: JSON.stringify(['中', 'EN']),
        icon: 'iconkaiguan',
        data: { flag: false, config: {} },
        callBackEvents: ['change'],
        style: {
            width: 73,
            height: 25,
            backgroundColor: '',
            color: 'rgba(46, 190, 243, 1)',
            fontSize: 14,
            fontWeight: 700,
            borderColor: '#2EBEF3',
            borderWidth: 1,
            borderRadius: 14,
            borderStyle: 'solid',
        },
    },
    {
        component: 'v-title',
        label: '标题',
        propValue: JSON.stringify({ left: 'iconfanhui', center: '标题', right: 'iconxiaoxitongzhi' }),
        icon: 'iconwenzi',
        data: { config: { position: 'center' } },
        callBackEvents: ['vTitleLeftClick', 'vTitleRightClick'],
        style: {
            width: 375,
            height: 40,
            fontSize: 14,
            backgroundColor: '#1B2238',
            color: '#E9ECF0',
        },
    },
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list
