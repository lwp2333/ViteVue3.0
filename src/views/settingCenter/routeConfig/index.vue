<template>
  <div class="container">
    <a-row :gutter="[32, 32]">
      <a-col :xl="6" :xs="24">
        <a-card :loading="loading" title="菜单">
          <template #extra>
            <a-space>
              <a-button type="link">添加菜单</a-button>
              <a-button type="link">添加子菜单</a-button>
            </a-space>
          </template>
          <a-tree :tree-data="routeList" show-icon default-expand-all @select="onSelectNode">
            <template #icon="{ iconType }">
              <icon-font v-if="iconType" :type="iconType" />
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :xl="18" :xs="24">
        <a-card title="配置">
          <template #extra>
            <a-button :disabled="!currentNode.data || !isLimitEdit" type="link" @click="onEdit">
              <template #icon> <EditOutlined /> </template>编辑
            </a-button>
          </template>
          <a-form
            v-if="currentNode.data"
            :ref="setRef"
            :model="currentNode.data"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="标题" name="title">
              <a-input v-model:value="currentNode.data.title" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="路径" name="path">
              <a-input v-model:value="currentNode.data.path" :disabled="isLimitEdit" />
            </a-form-item>
            <a-form-item label="图标" name="iconType"> </a-form-item>
            <a-form-item :wrapper-col="{ xl: 10, sm: 16, offset: 8 }">
              <a-space v-if="!isLimitEdit">
                <a-button @click="onCancel"> 取消 </a-button>
                <a-button type="primary" @click="onSubmit"> 保存 </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watch, computed, toRefs, nextTick } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { NotEmpty, NotSelect, limitStr } from '/@/utils/validate'
import iconFont from '/@/components/global/iconFont.js'
import routeConfig from '/@/constant/routeConfig.js'
export default {
  name: 'RouteConfig',
  components: {
    iconFont,
    EditOutlined
  },
  setup() {
    const loading = ref(false)
    const currentNode = reactive({
      data: null
    })
    const onSelectNode = (keys, { selectedNodes, node }) => {
      // 取消选择或者选择其他的时候 都重置为空
      currentNode.data = null
      if (selectedNodes.length) {
        const { props } = selectedNodes[0]
        const { id, title, path, isLeaf, iconType } = props
        // 清除上一个
        nextTick(() => {
          currentNode.data = {
            id,
            title,
            path,
            isLeaf,
            iconType
          }
        })
      }
    }
    const routeList = reactive(routeConfig)
    // 配置表单
    const ruleForm = ref(null)
    const isLimitEdit = ref(true)
    const setRef = el => {
      ruleForm.value = el
    }
    const onEdit = () => {
      isLimitEdit.value = false
    }
    const onSubmit = () => {
      ruleForm.value
        .validate()
        .then(() => {
          console.log('values', routeConfigform)
        })
        .catch(error => {
          console.log('error', error)
        })
    }
    const onCancel = () => {
      isLimitEdit.value = true
      ruleForm.value.resetFields()
    }

    onMounted(() => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 1200)
    })
    return {
      onSelectNode,
      loading,
      routeList,
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

      currentNode,
      rules: {
        title: [limitStr('标题', 2, 8)],
        path: [NotEmpty('路径')]
      },
      isLimitEdit,
      onEdit,
      onSubmit,
      onCancel
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
