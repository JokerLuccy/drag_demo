<template>
    <div class="home">
        <Toolbar />

        <main :class="{ 'main-showCompletePage': !isShowCompletePage ? '' : 'main-showCompletePage' }">
            <template v-if="!isShowCompletePage">
                <!-- 左侧组件列表 -->
                <section class="left">
                    <ComponentList />
                </section>
                <!-- 中间画布 -->
                <section class="center">
                    <div
                        class="content"
                        @dragover="handleDragOver"
                        @drop="handleDrop"
                        @mousedown="handleMouseDown"
                        @mouseup="deselectCurComponent"
                    >
                        <Editor />
                    </div>
                </section>
                <!-- 右侧属性列表 -->
                <section class="right">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="属性" name="attr">
                            <!-- 是否有选中元素-->
                            <AttrList v-if="curComponent" />
                            <p v-else class="placeholder">请选择组件</p>
                        </el-tab-pane>
                        <el-tab-pane label="动画" name="animation">
                            <AnimationList v-if="curComponent" />
                            <p v-else class="placeholder">请选择组件</p>
                        </el-tab-pane>
                        <el-tab-pane label="事件" name="events">
                            <EventList v-if="curComponent" />
                            <p v-else class="placeholder">请选择组件</p>
                        </el-tab-pane>
                    </el-tabs>
                </section>
            </template>
            <template v-else>
                <!--                <div class="canvas-container" v-for="(page, index) in pagesData" :key="index">-->
                <!--                    <div-->
                <!--                        class="canvas"-->
                <!--                        :style="{-->
                <!--                            width: changeStyleWithScale(page.canvasStyle.width) + 'px',-->
                <!--                            height: changeStyleWithScale(page.canvasStyle.height) + 'px',-->
                <!--                        }"-->
                <!--                    >-->
                <!--                        <ComponentWrapper v-for="(item, index) in page.canvasData" :key="index" :config="item" />-->
                <!--                    </div>-->
                <!--                </div>-->
                <div class="page-list" v-for="(page, index) in pagesData" :key="index">
                    <img id="pic-img" :src="page.img" alt="图片显示错误" />
                    <div class="page-des">
                        <p>标题:{{ page.name }}</p>
                        <p>时间:{{ page.createdAt }}</p>
                    </div>
                    <div class="page-bottom">
                        <a
                            @click="handleBottomFun(item.id, page)"
                            :title="item.text"
                            v-for="item in bottomList"
                            :key="item.id"
                            class="iconfont"
                            :class="'icon-' + item.icon"
                        ></a>
                    </div>
                </div>
                <!-- 预览 -->
                <Preview v-model="isShowPreview" @change="handlePreviewChange" />
            </template>
        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AttrList from '@/components/AttrList' // 右侧属性列表
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import { changeStyleWithScale } from '@/utils/translate'
import { getStyle } from '@/utils/style'
// import ComponentWrapper from '../components/Editor/ComponentWrapper.vue'
import Preview from '@/components/Editor/Preview'

export default {
    components: { Editor, ComponentList, AttrList, AnimationList, EventList, Toolbar, Preview },
    data() {
        return {
            isShowPreview: false, // 预览开关
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            bottomList: [
                { id: 0, icon: 'bianji', text: '编辑' },
                { id: 1, icon: 'eye', text: '预览' },
                { id: 2, icon: 'del', text: '删除' },
                { id: 3, icon: 'qrcode', text: '二维码查看' },
            ],
        }
    },
    computed: {
        ...mapState(['componentData', 'curComponent', 'isClickComponent', 'canvasStyleData', 'isShowCompletePage', 'pagesData']),
    },
    created() {
        this.restore()
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        getStyle,
        changeStyleWithScale,
        restore() {
            // 用保存的数据恢复画布
            if (localStorage.getItem('canvasData')) {
                this.$store.commit('setComponentData', this.resetID(JSON.parse(localStorage.getItem('canvasData'))))
            }

            if (localStorage.getItem('canvasStyle')) {
                this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            }
            if (localStorage.getItem('pagesData')) {
                this.$store.commit('setPagesData', JSON.parse(localStorage.getItem('pagesData')))
            }
        },

        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
            })

            return data
        },
        // 拖拽释放触发
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            console.log('index', index)
            if (index) {
                const component = deepCopy(componentList[index])
                component.style.top = e.offsetY
                component.style.left = e.offsetX
                component.id = generateID()
                this.$store.commit('addComponent', { component })
                this.$store.commit('recordSnapshot')
            }
        },

        handleDragOver(e) {
            // 拖动效果
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown() {
            this.$store.commit('setClickComponentStatus', false)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                // 取消当前选中组件
                this.$store.commit('setCurComponent', { component: null, index: null })
            }

            // 0 左击 1 滚轮 2 右击
            if (e.button !== 2) {
                // 复制粘贴列表 隐藏显示....
                this.$store.commit('hideContextMenu')
            }
        },
        // 点击对应icon 逻辑处理
        handleBottomFun(val, page) {
            if (val === 0) {
                // 编辑
                this.handleEdit()
            } else if (val === 1) {
                // 预览
                this.handlePreview(page)
            } else if (val === 2) {
                // 删除
                this.handleDelPage()
            } else {
                // 二维码预览
                this.handlePreviewInQrcode()
            }
        },
        // 预览处理
        handlePreview(page) {
            this.$store.commit('setComponentData', page.canvasData)
            this.$store.commit('setCanvasStyle', page.canvasStyle)
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'preview')
        },
        // 删除处理
        handleDelPage() {
            console.log('删除处理')
        },
        // 编辑处理
        handleEdit() {
            console.log('编辑处理')
        },
        // 二维码处理
        handlePreviewInQrcode() {
            console.log('二维码处理')
        },
        // 关闭预览
        handlePreviewChange() {
            this.$store.commit('setEditMode', 'edit')
        },
    },
}
</script>

<style lang="scss" scoped>
.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 262px;
            right: 0;
            top: 0;
        }

        .center {
            margin-left: 200px;
            margin-right: 262px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .main-showCompletePage {
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: row;

        .canvas-container {
            // width: calc(100% - 40px);
            width: 100%;
            height: calc(100% - 120px);
            overflow: auto;

            .canvas {
                background: #fff;
                position: relative;
                margin: auto;
            }
        }

        .page-list {
            margin-right: 10px;
            width: 244px;
            height: 455px;
            border: 1px dashed #959595;

            #pic-img {
                height: 300px;
                width: 100%;
                border-bottom: 1px dashed #959595;
            }

            .page-des {
                height: 105px;
                box-sizing: border-box;
                padding: 24px;
                display: flex;
                flex-direction: column;
                font-size: 12px;
            }
            .page-bottom {
                width: 100%;
                height: 40px;
                background-color: #fafafa;
                border-top: 1px solid #e8e8e8;
                display: flex;
                align-items: center;
                flex-direction: row;
                a {
                    width: 25%;
                    text-align: center;
                    height: 22px;
                    border-left: 1px solid rgba(0, 0, 0, 0.45);
                    cursor: pointer;
                }
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
