// 编辑器初始化 销毁 及样式配置
import vm from '@/utils/eventBus'
import * as monaco from 'monaco-editor'
// 编辑器初始化
export function initEditor(eventEditId) {
    vm.editor = monaco.editor.create(document.getElementById(eventEditId), {
        value: '' + eventEditId, // 编辑器初始显示文字
        language: 'javascript', // 语言支持自行查阅demo
        automaticLayout: true, // 自动布局
        theme: 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
    })
    // 同步取值
    vm.editor.onDidChangeModelContent(() => {
        // this.editContext = this.editor.getValue()
        vm.$emit('getCodeContext', vm.editor.getValue())
    })
}
// 销毁编辑器
export function destoryEditor() {
    vm.editor.dispose()
    vm.editor = null
}
