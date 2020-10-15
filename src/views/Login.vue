<template>
  <validate-form @form-submit="submitForm">
    <div class="form-group mb-3">
      <label for="exampleInputEmail1">邮箱地址</label>
      <validate-input :rules="emailRules" v-model="emialVal" type="text" placeholder="请输入邮箱"></validate-input>
    </div>
    <div class="form-group mb-3">
      <label for="exampleInputPassword1">密码</label>
      <validate-input :rules="passwordRules" v-model="passwordVal" type="password" placeholder="请输入密码"></validate-input>
    </div>
  </validate-form>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput from '../components/validateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const emailMessageRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailRules = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '格式不对' }]
    const emialVal = ref('')
    const passwordRules = [
      { type: 'required', message: '不能为空' }
    ]
    const passwordVal = ref('')
    const store = useStore()
    const submitForm = (arg: boolean) => {
      if (arg) {
        store.commit('login')
        router.push({ path: '/' })
      }
    }
    return {
      emailMessageRef,
      emailRules,
      emialVal,
      passwordRules,
      passwordVal,
      submitForm
    }
  }
})
</script>
<style>
</style>
