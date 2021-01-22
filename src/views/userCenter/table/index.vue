<template>
  <div class="container">
    <div class="topAction">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <a-select v-model:value="params.sex" allowClear size="small" placeholder="请选择性别">
            <a-select-option value="男"> 男 </a-select-option>
            <a-select-option value="女"> 女 </a-select-option>
          </a-select>
        </a-col>
        <a-col>
          <a-button type="link" size="small" @click="createRecord">
            <template #icon><FormOutlined /> </template>
            创建
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      :columns="columns"
      :loading="tableLoading"
      :data-source="list"
      :pagination="tablePagination"
      rowKey="_id"
      size="small"
      @change="tablePaginationChange"
    >
      <template #customTitle>
        <span><SmileOutlined /> 姓名</span>
      </template>
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customAvatar>
        <span><AndroidFilled /> 头像</span>
      </template>
      <template #avatar="{ text: avatar }">
        <a-avatar :size="48" :src="avatar"></a-avatar>
      </template>
      <template #tags="{ text: tags }">
        <span>
          <a-tag v-for="(tag, index) in tags" :key="tag" :color="colorList[index % 6]">
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

    <a-modal v-model:visible="visible" ok-text="确认" cancel-text="取消" @ok="handleSubmit">
      <template #footer>
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
        <a-button key="submit" type="primary" :loading="submitLoading" @click="handleSubmit"> 确定 </a-button>
      </template>
      <a-form
        :ref="setRef"
        :model="form"
        :rules="rules"
        :label-col="{
          xl: 4,
          sm: 8
        }"
        :wrapper-col="{
          xl: 10,
          sm: 16
        }"
      >
        <a-form-item label="昵称" name="avatar">
          <a-upload
            :fileList="fileList"
            name="files"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/dev/api/uploadFile"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" class="avatar" :src="imageUrl" alt="avatar" />
            <div v-else>
              <!-- todo -->
              <loading-outlined v-if="avatarLoading" />
              <plus-outlined v-else />
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="昵称" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-textarea v-model:value="form.age" />
        </a-form-item>
        <a-form-item label="性别" name="sex">
          <a-radio-group v-model:value="form.sex" button-style="solid">
            <a-radio-button value="男"> 男 </a-radio-button>
            <a-radio-button value="女"> 女 </a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted } from 'vue'
import {
  SmileOutlined,
  DownOutlined,
  AndroidFilled,
  FormOutlined,
  DeleteOutlined,
  EyeInvisibleFilled,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import { getUserListByPage, delUser, createUser, downloadFile } from '/@/api/user'
import { message } from 'ant-design-vue'
import useTableRequest from '/@/hooks/useTableRequest'
export default {
  name: 'Table',
  components: {
    SmileOutlined,
    AndroidFilled,
    FormOutlined,
    DeleteOutlined,
    LoadingOutlined,
    PlusOutlined
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
    // 将params 作为响应式数据，可以在useTableRequest 自动更新
    const params = reactive({
      pageNum: 1,
      pageSize: 4,
      sex: null
    })
    const {
      list,
      tablePagination,
      tableError,
      tableLoading,
      Action: [refreshTableData, tablePaginationChange]
    } = useTableRequest(getUserListByPage, params, true)
    const colorList = ['pink', 'orange', 'green', 'cyan', 'blue', 'purple']
    /**
     *  创建逻辑
     */
    const form = reactive({
      avatar: [],
      name: '',
      age: '',
      description: '',
      sex: ''
    })
    const ruleForm = ref(null)
    const rules = []
    const setRef = el => {
      ruleForm.value = el
    }
    const submitLoading = ref(false)
    const visible = ref(false)
    const createRecord = () => {
      visible.value = true
    }
    /**头像上传逻辑 */
    const uploadFileModel = reactive({
      fileList: []
    })
    const imageUrl = ref(null)
    const avatarLoading = ref(false)
    const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('请选择上传png/jpg的格式图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('请选择上传大小不超过2mb的图片')
      }
      return isJpgOrPng && isLt2M
    }
    const handleChange = info => {
      uploadFileModel.fileList = [...info.fileList]
      if (info.file.status === 'uploading') {
        avatarLoading.value = true
        return
      }
      if (info.file.status === 'done') {
        avatarLoading.value = false
        const { ossUrl } = info.file.response.data
        imageUrl.value = ossUrl
      }
      if (info.file.status === 'error') {
        avatarLoading.value = false
      }
    }
    const handleCancel = () => {
      visible.value = false
    }
    const handleSubmit = () => {
      const fileName = '照片磁贴.jpg'
      downloadFile({ fileName })
    }
    /**
     * 编辑逻辑
     */
    const EditRecord = ({ _id }) => {
      console.log(_id)
    }
    /**
     * 删除逻辑
     */
    const DelRecord = async ({ _id }) => {
      await delUser({ _id })
      /** 重新刷新数据 */
      await refreshTableData(params)
    }

    return {
      columns,
      list,
      tablePagination,
      tablePaginationChange,
      tableError,
      tableLoading,
      colorList,
      params,
      form,
      rules,
      setRef,
      visible,

      createRecord,
      ...toRefs(uploadFileModel),
      imageUrl,
      avatarLoading,
      beforeUpload,
      handleChange,
      submitLoading,
      handleCancel,
      handleSubmit,

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
  .topAction {
    margin-bottom: 20px;
  }
}
.delColor {
  color: red;
}
.avatar {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
