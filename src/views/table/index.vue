<template>
  <div class="container">
    <a-table :columns="columns" :data-source="list">
      <template #customTitle>
        <span><SmileOutlined /> 姓名</span>
      </template>
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customAvatar>
        <span><AndroidFilled /> 头像</span>
      </template>
      <template #avatar="{ text }">
        <a-avatar :size="48" :src="text.url"></a-avatar>
      </template>
      <template #tags="{ text: tags }">
        <span>
          <a-tag v-for="tag in tags" :key="tag" color="green">
            {{ tag }}
          </a-tag>
        </span>
      </template>
      <template #action="{ text: record }">
        <a-space>
          <a-button type="link" size="small" @click="EditRecord(record)">
            <template #icon><FormOutlined /> </template>
            编辑
          </a-button>

          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="DelRecord(record)">
            <a-button class="delColor" type="link" size="small">
              <template #icon><DeleteOutlined /> </template> 删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>

    <a-button type="link" size="small" @click="createRecord">
      <template #icon><FormOutlined /> </template>
      创建
    </a-button>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted } from 'vue'
import { SmileOutlined, DownOutlined, AndroidFilled, FormOutlined, DeleteOutlined, EyeInvisibleFilled } from '@ant-design/icons-vue'
import { getUserListByPage, delUser, createUser } from '/@/api/user'
import { message } from 'ant-design-vue'

export default {
  name: 'Table',
  components: {
    SmileOutlined,
    AndroidFilled,
    FormOutlined,
    DeleteOutlined
  },
  setup() {
    const columns = [
      {
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        slots: { title: 'customAvatar', customRender: 'avatar' }
      },
      {
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        slots: { title: 'customTitle', customRender: 'name' }
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align: 'center'
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        align: 'center',
        slots: { customRender: 'tags' }
      },
      {
        title: '描述',
        dataIndex: 'description',
        align: 'center',
        key: 'description'
      },
      {
        title: '操作',
        align: 'center',
        key: 'record',
        slots: { customRender: 'action' }
      }
    ]
    let params = {
      pageNum: 1,
      pageSize: 5
    }
    let list = reactive([])
    const initData = async () => {
      const res = await getUserListByPage(params).catch(err => {
        console.log(err)
      })
      if (res) {
        list.length = 0
        list.push(...res.list)
      }
    }
    onMounted(() => {
      initData()
    })
    const createRecord = params => {
      createUser(params)
    }
    const EditRecord = ({ _id }) => {
      console.log(_id)
    }
    const DelRecord = async ({ _id }) => {
      await delUser({ _id })
      // initData()
    }
    return {
      columns,
      list,
      createRecord,
      EditRecord,
      DelRecord
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.delColor {
  color: red;
}
</style>
