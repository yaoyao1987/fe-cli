<template>
  <client-only>
    <!--
      model：模型值，它里面的属性值要跟后台一致，因为要提交给后台
      rules：校验规则
      ref：将来获取表单实例
      -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="email">
        <el-input
          v-model="ruleForm.email"
          prefix-icon="el-icon-user"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="ruleForm.checked" />我已阅读并同意
        <!-- <nuxt-link type="primary" target="__blank" href="">用户协议</nuxt-link>和<nuxt-link type="primary">隐私条款</nuxt-link> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </client-only>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  ref,
  unref,
  toRef,
  toRefs,
} from '@nuxtjs/composition-api'

import { useUser } from '@/compositions'

import { Form, FormItem, Checkbox, Input } from 'element-ui'

export default defineComponent({
  name: 'LoginPage',
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Checkbox.name]: Checkbox,
    [Input.name]: Input,
  },
  setup() {
    // 表单的ref
    const ruleFormRef = ref(null)

    const { fetchAuthLogin } = useUser()
    const { redirect } = useContext()

    // 模型
    const ruleForm = reactive({
      email: '', // 手机号
      password: '', // 密码
      checked: true, // 是否同意用户协议
    })

    // 校验规则
    const rules = ref({
      email: [
        {
          validator: (rule: Function, value: string, callback: Function) => {
            // rule 规则，没什么价值
            // value 就是输入或是选择的值
            // callback 决定校验是成功还是失败，如果失败了 callback(new Error('提示信息'))，如果成功了则直接调用callback
            // 注意：无论成功与否，都要调用callback，否则下一个异步操作无法执行
            if (!value) {
              // 这个return 就是阻断代码执行
              return callback(new Error('邮箱不能为空'))
            }
            const reg = /^[a-z0-9]+([._\\-]*[a-z0-9]*@[a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            if (!reg.test(value)) {
              return callback(new Error('邮箱不合法'))
            }
            // 可定校验通过的
            callback()
          },
          trigger: 'blur',
        },
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 16, message: '密码必须在6-16位之间', trigger: 'blur' },
      ],
      code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
      checked: [
        {
          validator: (rule: Function, value: string, callback: Function) => {
            value ? callback() : callback(new Error('必须勾选用户协议'))
          },
          trigger: 'change',
        },
      ],
    })

    const handleLogin = async () => {
      const form: any = unref(ruleFormRef)

      if (!form) return

      try {
        if (!ruleForm.email || !ruleForm.password) {
          return
        }
        const isOk = await fetchAuthLogin(ruleForm)
        if (isOk) {
          await redirect('/')
        }
      } catch (error) {}
    }

    const register = () => {}

    return {
      ruleForm,
      rules,
      ruleFormRef,
      handleLogin,
      register,
    }
  },
})
</script>
