export default async function runAnimation($el, animations = []) {
    const play = (animation) => new Promise(resolve => {
        // 给元素添加类名
        $el.classList.add(animation.value, 'animated')
        const removeAnimation = () => {
            // 删除 移除动画事件
            $el.removeEventListener('animationend', removeAnimation)
            $el.removeEventListener('animationcancel', removeAnimation)
            // 移除类名，动画完成
            $el.classList.remove(animation.value, 'animated')
            resolve()
        }
        // 添加 移除动画事件
        $el.addEventListener('animationend', removeAnimation)
        $el.addEventListener('animationcancel', removeAnimation)
    })

    for (let i = 0, len = animations.length; i < len; i++) {
        await play(animations[i])
    }
}
