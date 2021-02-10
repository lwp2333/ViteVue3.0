<template>
  <div class="container">
    <img class="loginBg" :src="loginBg" alt="login" />
    <div class="loginContent">
      <a-card hoverable title="Next Admin" :tab-list="tabList" :active-tab-key="tabkey" @tabChange="tabChange">
        <template #customRender="item">
          <span> {{ item.key }} </span>
        </template>
        <div class="loginForm" v-if="tabkey === 'login'">
          <a-form :ref="setloginRef" :model="loginForm" :rules="loginRules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="用户名" name="name" :span="24">
              <a-input v-model:value="loginForm.name" placeholder="用户名随便输入" />
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password v-model:value="loginForm.password" placeholder="密码随便输入" />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-space size="large">
              <a-button @click="resetForm">重置</a-button>
              <a-button :loading="loginLoading" type="primary" @click="loginAction">登录</a-button>
            </a-space>
          </div>
        </div>
        <div class="registerForm" v-else>
          <a-form :ref="setRegisterRef" :model="registerForm" :rules="registerRules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="用户名" name="name" :span="24">
              <a-input v-model:value="registerForm.name" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="邮箱" name="email" :span="24">
              <a-input v-model:value="registerForm.email" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item label="密码" name="password" :span="24">
              <a-input-password v-model:value="registerForm.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item label="确认" name="confirmPassword" :span="24">
              <a-input-password v-model:value="registerForm.confirmPassword" placeholder="请再次输入密码" />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-button style="width: 120px" :loading="registerLoading" type="primary" @click="registerAction">注册</a-button>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import loginBg from '/@/assets/svg/login_bg.svg'
import { ref, reactive, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { NotEmpty, emailStr } from '/@/utils/validate'
import { login, register } from '/@/api/login'
import { setAccessToken, setRefreshToken } from '/@/utils/auth'
export default {
  name: 'Login',

  setup() {
    // 切换逻辑
    const tabkey = ref('login')
    const tabChange = key => {
      tabkey.value = key
    }
    // 登录表单逻辑
    const loginFormRef = ref(null)
    const loginLoading = ref(false)
    const loginForm = reactive({
      name: null,
      password: null
    })
    const setloginRef = el => {
      loginFormRef.value = el
    }
    const Router = useRouter()
    const { query } = useRoute()
    const loginAction = () => {
      loginFormRef.value.validate().then(() => {
        submitLogin(loginForm)
      })
    }
    const submitLogin = async data => {
      loginLoading.value = true
      const res = await login(data).catch(err => {
        console.log(err)
        loginLoading.value = false
      })
      loginLoading.value = false

      if (res) {
        const { accessToken, refreshToken } = res
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        Router.push({
          path: query.redirectUrl || '/main/userCenter/component'
        })
      }
    }
    const resetForm = () => {
      loginFormRef.value.resetFields()
    }
    // 注册表单逻辑

    const registerFormRef = ref(null)
    const setRegisterRef = el => {
      registerFormRef.value = el
    }
    const registerForm = reactive({
      name: null,
      email: null,
      password: null,
      confirmPassword: null
    })
    const registerLoading = ref(false)
    const registerAction = () => {
      registerFormRef.value.validate().then(() => {
        submitRegister()
      })
    }
    const submitRegister = () => {
      registerLoading.value = true
      register(registerForm)
        .then(res => {
          registerLoading.value = false
          Modal.confirm({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '是否立即登录？',
            onOk() {
              const { name, password } = registerForm
              submitLogin({ name, password })
            },
            onCancel() {}
          })
          // 注册成功是否立即登录
          // 1. 立即登录
          // 2. 清除表单， 切换到登录tab
        })
        .catch(err => {
          console.log(err)
          registerLoading.value = false
        })
    }
    // 密码确认校验函数
    const validatePass = async (rule, value) => {
      if (registerForm.password) {
        registerFormRef.value.validateField('confirmPassword')
      }
      return Promise.resolve()
    }
    const validateComfirmPass = async (rule, value) => {
      if (value !== registerForm.password) {
        return Promise.reject('俩次密码输入不一致')
      } else {
        return Promise.resolve()
      }
    }
    return {
      loginBg,
      tabList: [
        {
          key: 'login',
          tab: '登录'
        },
        {
          key: 'register',
          tab: '注册'
        }
      ],
      tabkey,
      tabChange,
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      //登录逻辑
      setloginRef,
      loginForm,
      loginRules: {
        name: [NotEmpty('用户名')],
        password: [NotEmpty('密码')]
      },
      loginAction,
      resetForm,
      loginLoading,
      // 注册表单逻辑
      setRegisterRef,
      registerForm,
      registerRules: {
        name: [NotEmpty('用户名')],
        email: [emailStr()],
        password: [NotEmpty('密码'), { validator: validatePass, trigger: 'change' }],
        confirmPassword: [{ required: true, validator: validateComfirmPass, trigger: 'change' }]
      },
      registerAction,
      registerLoading
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .loginBg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .loginContent {
    width: 480px;
    opacity: 0.92;
    position: absolute;
    top: 28%;
    right: 12%;
    @media screen and (max-width: 576px) {
      width: 88vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.loginForm,
.registerForm {
  padding: 24px 24px 24px 0px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
