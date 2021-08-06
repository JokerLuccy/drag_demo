<template>
    <div class="event-list">
        <div class="div-events">
            <el-button @click="handleAddEvent">添加事件</el-button>
            <div>
                <el-tag v-for="event in Object.keys(curComponent.events)" :key="event" closable
                        @close="removeEvent(event)">
                    {{ event }}
                </el-tag>
            </div>

        </div>

        <!-- 选择事件 -->
        <Modal v-model="isShowEvent">
            <el-tabs v-model="eventActiveName">
                <el-tab-pane v-for="item in eventList" :key="item.key" :label="item.label" :name="item.key"
                             style="padding: 0 20px">
                </el-tab-pane>
                <div id="monaco" class="monaco"></div>
                <el-button style="margin-top: 20px;" @click="addEvent(eventActiveName)">确定</el-button>
            </el-tabs>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal'
import { eventList } from '@/utils/events'
import { destoryEditor, initEditor } from '@/utils/codeEditor'
import vm from '@/utils/eventBus'

export default {
    components: { Modal },
    data() {
        return {
            isShowEvent: false,
            eventURL: '',
            eventActiveName: 'redirect',
            eventList, // 事件列表
            editContext: '',
        }
    },

    computed: mapState(['curComponent']),
    watch: {
        isShowEvent: {
            handler(newVal) {
                if (!newVal) {
                    destoryEditor()
                    vm.$off('getCodeContext')
                } else {
                    // 所有事件公用一个编辑器
                    initEditor('monaco')
                    vm.$on('getCodeContext', this.getCodeContext)
                }
            },
        },
    },
    methods: {
        // 添加事件
        addEvent(event) {
            this.isShowEvent = false

            this.$store.commit('addEvent', { event, param: this.editContext })
        },
        // 移除事件
        removeEvent(event) {
            this.$store.commit('removeEvent', event)
        },
        handleAddEvent() {
            this.isShowEvent = true
        },
        // 代码变化赋值
        getCodeContext(val) {
            this.editContext = val
        },

    },

    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.event-list {
    .div-events {
        text-align: center;
        padding: 0 20px;

        .el-button {
            display: inline-block;
            margin-bottom: 10px;
        }

        .el-tag {
            display: block;
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
        }
    }

    .monaco {
        width: 100%;
        height: 450px;
        // background-color: red;
    }
}
</style>
