<template>
  <a-form :ref="setRef" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="活动名称" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="活动代号" name="nickName">
      <a-input v-model:value="form.nickName" />
    </a-form-item>
    <a-form-item label="活动电话" name="phone">
      <a-input v-model:value="form.phone" />
    </a-form-item>
    <a-form-item label="举办人身份证" name="idcard">
      <a-input v-model:value="form.idcard" />
    </a-form-item>
    <a-form-item label="活动邮箱" name="email">
      <a-input v-model:value="form.email" />
    </a-form-item>
    <a-form-item label="活动地址" name="region">
      <a-select v-model:value="form.region" placeholder="请选择活动地址">
        <a-select-option value="北京"> 北京 </a-select-option>
        <a-select-option value="上海"> 上海 </a-select-option>
        <a-select-option value="杭州"> 杭州 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="活动时间" required name="date">
      <a-date-picker format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" v-model:value="form.date" show-time type="date" />
    </a-form-item>
    <a-form-item label="是否发布" name="publish">
      <a-switch v-model:checked="form.publish" />
    </a-form-item>
    <a-form-item label="活动类型" name="type">
      <a-checkbox-group v-model:value="form.type">
        <a-checkbox value="1" name="type"> one </a-checkbox>
        <a-checkbox value="2" name="type"> two </a-checkbox>
        <a-checkbox value="3" name="type"> three </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="活动来源" name="resource">
      <a-radio-group v-model:value="form.resource">
        <a-radio value="线上"> 线上 </a-radio>
        <a-radio value="线下"> 线下 </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="活动描述" name="desc">
      <a-textarea v-model:value="form.desc" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { NotEmpty, NotSelect, NotRadio, limitStr, nickStr, phoneStr, idCardStr, emailStr } from '/@/utils/validate'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
export default {
  setup() {
    const ruleForm = ref(null)
    const form = reactive({
      name: null,
      nickName: null,
      phone: null,
      idcard: null,
      email: null,
      region: null,
      date: null,
      publish: null,
      type: [],
      resource: null,
      desc: null
    })
    const setRef = el => {
      ruleForm.value = el
    }
    // onMounted(() => {
    //   console.dir(ruleForm)
    // })
    // form.desc = computed({
    //   get: () => {
    //     if (form.name && form.region) return form.name + ' ' + form.region
    //   },
    //   set: value => {
    //     if (value) {
    //       const [name, region] = value.trim().split(' ')
    //       form.name = name || ''
    //       form.region = region || ''
    //     }
    //   }
    // })
    const onSubmit = () => {
      ruleForm.value
        .validate()
        .then(() => {
          console.log('values', form)
        })
        .catch(error => {
          console.log('error', error)
        })
    }
    const resetForm = () => {
      ruleForm.value.resetFields()
    }
    return {
      labelCol: {
        xl: 4,
        sm: 8
      },
      wrapperCol: {
        xl: 10,
        sm: 16
      },
      ruleForm,
      form,
      rules: {
        name: [limitStr('活动名称')],
        nickName: [nickStr('活动代号')],
        phone: [phoneStr()],
        idcard: [idCardStr()],
        email: [emailStr()],
        region: [NotRadio('活动地址')],
        date: [NotRadio('活动时间')],
        type: [NotSelect('活动类型')],
        resource: [NotRadio('活动来源')],
        desc: [NotEmpty('活动描述')]
      },
      onSubmit,
      resetForm,
      setRef
    }
  }
}
</script>
