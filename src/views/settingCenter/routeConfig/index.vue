<template>
  <div class="container">
    <a-row :gutter="[32, 32]">
      <a-col :xl="6" :xs="24">
        <a-card :loading="loading">
          <template #title>
            <span :style="{ lineHeight: '32px', fontWeight: 600 }">菜单</span>
          </template>
          <template #extra>
            <a-space>
              <a-button type="link">添加菜单</a-button>
              <a-button type="link">添加子菜单</a-button>
            </a-space>
          </template>
          <a-tree
            :tree-data="routeList"
            :replaceFields="resetFieldMap"
            :selectable="false"
            show-icon
            default-expand-all
            @click="onClickNode"
            @rightClick="onRightClick"
          >
            <template #icon="{ iconType }">
              <icon-font v-if="iconType" :type="iconType" />
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :xl="18" :xs="24">
        <a-card>
          <template #title>
            <span :style="{ lineHeight: '32px', fontWeight: 600 }"
              >{{ routeConfigform ? (routeConfigform.isLeaf ? '页面' : '菜单') : '' }}配置</span
            >
          </template>
          <template #extra>
            <a-button v-show="routeConfigform && isLimitEdit" :disabled="!routeConfigform || !isLimitEdit" type="link" @click="onEdit">
              <template #icon> <EditOutlined /> </template>编辑
            </a-button>
            <a-popconfirm title="确认删除该条记录?" placement="bottom" ok-text="确认" cancel-text="取消" @confirm="onDell">
              <a-button v-show="routeConfigform && isLimitEdit" type="link">
                <template #icon> <DeleteOutlined :style="{ color: 'red' }" /> </template>
                <span :style="{ color: 'red' }">删除</span>
              </a-button>
            </a-popconfirm>
          </template>
          <a-form
            v-if="routeConfigform"
            :ref="setRef"
            :model="routeConfigform"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="标题" name="title">
              <a-input v-model:value="routeConfigform.title" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="路径" name="path">
              <a-input v-model:value="routeConfigform.path" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="图标" name="iconType">
              <a-select allowClear v-model:value="routeConfigform.iconType" :disabled="isLimitEdit">
                <a-select-option v-for="item in iconOption" :key="item.name" :value="item.type">
                  {{ item.name }} - <icon-font :type="item.type" :style="{ fontSize: '18px' }" />
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ xl: 10, sm: 16, offset: 8 }">
              <a-space v-if="!isLimitEdit">
                <a-button @click="onEditCancel"> 取消 </a-button>
                <a-button type="primary" @click="onEditSubmit"> 保存 </a-button>
              </a-space>
            </a-form-item>
          </a-form>
          <noData v-else />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watch, computed, toRefs, nextTick } from 'vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { NotEmpty, NotRadio, limitStr } from '/@/utils/validate'
import iconFont from '/@/components/global/iconFont.js'
import noData from '/@/components/global/noData.vue'
import routeConfig from '/@/constant/routeConfig.js'
import iconList from '/@/constant/iconFontList.js'
export default {
  name: 'RouteConfig',
  components: {
    iconFont,
    EditOutlined,
    DeleteOutlined,
    noData
  },
  setup() {
    const loading = ref(false)
    const currentNode = reactive({
      routeConfigform: null
    })
    const onSelectNode = (keys, { selectedNodes, node }) => {
      // 取消选择或者选择其他的时候 都重置为空
      currentNode.routeConfigform = null
      if (selectedNodes.length) {
        const { props } = selectedNodes[0]
        const { id, title, path, isLeaf, iconType } = props
        // 清除上一个
        nextTick(() => {
          currentNode.routeConfigform = {
            id,
            title,
            path,
            isLeaf,
            iconType
          }
        })
      }
    }
    const onClickNode = (e, node) => {
      // 清除上一个表单
      currentNode.routeConfigform = null
      const {
        dataRef: { id, title, path, isLeaf, iconType }
      } = node
      nextTick(() => {
        currentNode.routeConfigform = {
          id,
          title,
          path,
          isLeaf,
          iconType
        }
      })
    }
    const onRightClick = ({ node }) => {
      const { eventKey, isLeaf } = node
      console.log(eventKey, isLeaf)
    }
    const routeList = reactive(routeConfig)
    const iconOption = reactive(iconList)
    // 配置表单
    const ruleForm = ref(null)
    const isLimitEdit = ref(true)
    const setRef = el => {
      ruleForm.value = el
    }
    const onEdit = () => {
      isLimitEdit.value = false
    }
    const onEditSubmit = () => {
      ruleForm.value
        .validate()
        .then(() => {
          console.log('values', currentNode.routeConfigform)
        })
        .catch(error => {
          console.log('error', error)
        })
    }
    const onEditCancel = () => {
      isLimitEdit.value = true
      ruleForm.value.resetFields()
    }
    const onDell = () => {
      currentNode.routeConfigform = null
    }

    onMounted(() => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 800)
    })
    return {
      loading,
      routeList,
      resetFieldMap: { children: 'children', title: 'title', key: 'id' },
      onSelectNode,
      onClickNode,
      onRightClick,
      // 配置表单
      setRef,
      labelCol: {
        xl: 4,
        sm: 8
      },
      wrapperCol: {
        xl: 10,
        sm: 16
      },

      ...toRefs(currentNode),
      iconOption, // 图标选择列表
      rules: {
        title: [limitStr('标题', 2, 8)],
        path: [NotEmpty('路径')],
        iconType: [NotRadio('图标')]
      },
      isLimitEdit,
      onEdit,
      onEditSubmit,
      onEditCancel,
      onDell
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .ant-row {
    height: 100%;
  }
}
.ant-card {
  height: 100%;
}
</style>
