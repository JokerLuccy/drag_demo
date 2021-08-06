// 基准大小
const baseSize = 32
function remSize() {
    // 1rem = 16px
    const scale = document.documentElement.clientWidth / 750
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
remSize()
window.onresize = function () {
    remSize()
}
