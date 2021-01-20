<template>
  <div class="container">
    <div class="topAction">
      <a-form v-model:value="search" :labelCol="formLabelCol" :wrapperCol="formWrapperCol">
        <a-row type="flex" align="middle">
          <a-col v-bind="formItemCol">
            <a-form-item label="角色名称">
              <a-input allowClear v-model:value="search.roleName" placeholder="请输入"></a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemCol">
            <a-form-item label="角色级别">
              <a-select v-model:value="search.roleLevel" allowClear placeholder="请选择">
                <a-select-option value="超级管理员"> 超级管理员 </a-select-option>
                <a-select-option value="普通用户"> 普通用户 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="formItemCol">
            <a-form-item label="操作列表">
              <a-space>
                <a-button type="primary">新增角色</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
  <a-table
    :loading="tableLoading"
    :data-source="list"
    :pagination="tablePagination"
    rowKey="_id"
    size="small"
    @change="tablePaginationChange"
  >
    <a-table-column key="roleName" title="角色名称" data-index="roleName" />
    <a-table-column key="roleLevel" title="角色级别" data-index="roleLevel" />
    <a-table-column key="description" title="描述" data-index="description" />
    <a-table-column key="action" title="操作">
      <template #default="{ text, record }">
        <a-space>
          <a-button type="link" @click="handleConfigDetail(record)">配置</a-button>
        </a-space>
      </template>
    </a-table-column>
  </a-table>
  <a-drawer :width="375" title="角色配置" placement="right" :maskClosable="false" :closable="false" v-model:visible="configDrawerShow">
    <a-alert message="注意选中子菜单时候，不要忘记选中父级菜单" type="info" show-icon />
    <a-card :loading="loading" :bordered="false">
      <a-tree
        :checkedKeys="bindMenu"
        :tree-data="tree"
        :replaceFields="resetFieldMap"
        checkable
        checkStrictly
        show-icon
        defaultExpandAll
        @check="onCheckNode"
      >
        <template #icon="{ iconType }">
          <icon-font v-if="iconType" :type="iconType" />
        </template>
      </a-tree>
    </a-card>
    <div class="configAction">
      <a-space>
        <a-button @click="onConfigCancel"> 取消 </a-button>
        <a-button type="primary" @click="onConfigSubmit"> 保存 </a-button>
      </a-space>
    </div>
  </a-drawer>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted } from 'vue'
import { formLabelCol, formWrapperCol, formItemCol } from '/@/constant/rowColOptions'
import useTableRequest from '/@/hooks/useTableRequest'
import { getRoleListByPage, updateRole } from '/@/api/role'
import { getMenuList } from '/@/api/menu'
import iconFont from '/@/components/global/iconFont.js'
export default {
  name: 'RoleConfig',
  components: {
    iconFont
  },
  setup() {
    const search = reactive({
      pageNum: 1,
      pageSize: 10,
      roleName: undefined,
      roleLevel: undefined
    })
    const {
      list,
      tablePagination,
      tableError,
      tableLoading,
      Action: [refreshTableData, tablePaginationChange]
    } = useTableRequest(getRoleListByPage, search, true)
    const handleConfigDetail = row => {
      configDrawerShow.value = true
      currentRole.bindMenu = row.bindMenu
      currentRole.id = row._id
      initTreeData()
    }
    const configDrawerShow = ref(false)

    const routeList = reactive({
      tree: null
    })
    const currentRole = reactive({
      bindMenu: {
        checked: [],
        halfChecked: []
      },
      id: ''
    })
    const loading = ref(false)
    const initTreeData = async () => {
      loading.value = true
      const res = await getMenuList().catch(() => {
        loading.value = false
      })
      routeList.tree = res || []
      loading.value = false
    }
    onMounted(() => {})
    const onCheckNode = checkKeys => {
      const { checked } = checkKeys
      currentRole.bindMenu = [...checked]
    }
    const onConfigCancel = () => {
      configDrawerShow.value = false
    }
    const onConfigSubmit = async () => {
      const { id, bindMenu } = currentRole
      const data = {
        _id: id,
        bindMenu
      }
      updateRole(data).then(() => {
        refreshTableData(search)
        configDrawerShow.value = false
      })
    }
    return {
      formLabelCol,
      formWrapperCol,
      formItemCol,
      search,
      list,
      tablePagination,
      tablePaginationChange,
      tableError,
      tableLoading,
      handleConfigDetail,
      configDrawerShow,
      ...toRefs(currentRole),
      ...toRefs(routeList),
      resetFieldMap: { value: '_id', key: '_id' },
      loading,
      onCheckNode,
      onConfigSubmit,
      onConfigCancel
    }
  }
}
</script>

<style scoped lang="scss">
.configAction {
  width: 100%;
  padding: 24px;
  text-align: center;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>
