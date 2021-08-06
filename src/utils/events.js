/* eslint-disable no-eval */
// 编辑器自定义事件
const events = {
    redirect(url) {
        if (url) {
            window.location.href = url
        }
    },

    alert(msg) {
        // eslint-disable-next-line no-eval
        eval(msg)
    },
    click(param) {
        eval(param)
    },
}

const mixins = {
    methods: events,
}

const eventList = [
    {
        key: 'redirect',
        label: '跳转事件',
        event: events.redirect,
        param: '',
        elId: 'redirect-monaco',
    },
    {
        key: 'alert',
        label: 'alert 事件',
        event: events.alert,
        param: '',
        elId: 'alert-monaco',
    },
    {
        key: 'click',
        label: 'click事件',
        event: events.click,
        param: '',
    },

]

export { mixins, events, eventList }
