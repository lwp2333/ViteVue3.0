<template>
  <div class="container">
    <img class="loginBg" :src="loginBg" alt="login" />
    <div class="loginCard">
      <a-card hoverable title="Next Admin" :tab-list="tabList" :active-tab-key="tabkey" @tabChange="tabChange">
        <template #customRender="item">
          <span> {{ item.key }} </span>
        </template>
        <div class="loginForm" v-if="tabkey === 'login'">
          <a-form :ref="setRef" :model="loginForm" :rules="loginRules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="用户名" name="userName">
              <a-input v-model:value="loginForm.userName" placeholder="用户名随便输入" />
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input type="password" v-model:value="loginForm.password" placeholder="密码随便输入" />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-button :loading="loginLoading" type="primary" @click="loginAction">登录</a-button>
          </div>
        </div>
        <div class="registerForm" v-else>register</div>
      </a-card>
    </div>
  </div>
</template>

<script>
import loginBg from '/@/assets/svg/login_bg.svg'
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NotEmpty } from '/@/utils/validate'
import { login } from '/@/api/user'
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
      userName: null,
      password: null
    })
    const setRef = el => {
      loginFormRef.value = el
    }
    const Router = useRouter()
    const { query } = useRoute()
    const loginAction = () => {
      loginFormRef.value.validate().then(() => {
        submitLogin()
      })
    }
    const submitLogin = async () => {
      loginLoading.value = true
      const res = await login(loginForm).catch(err => {
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
    // const resetForm = () => {
    //   loginFormRef.value.resetFields()
    // }
    // 注册表单逻辑
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

      setRef,
      labelCol: {
        xl: 6,
        sm: 8
      },
      wrapperCol: {
        xl: 18,
        sm: 16
      },
      loginFormRef,
      loginForm,
      loginRules: {
        userName: [NotEmpty('用户名')],
        password: [NotEmpty('密码')]
      },
      loginAction,
      loginLoading
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
    object-fit: contain;
  }
  .loginCard {
    opacity: 0.92;
    position: absolute;
    top: 28%;
    right: 12%;
  }
}
.loginForm,
.registerForm {
  width: 360px;
  min-height: 180px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
