<template>
    <div class="container mb-3">
        <nav class="navbar d-flex justify-content-between">
            <router-link class="navbar-brand text-white" to="/">者也专栏</router-link>
            <ul class="mb-0" v-if="!user.isLogin">
              <li class="list-inline-item"><router-link to="/login"><button class="btn btn-outline-light">登录</button></router-link></li>
              <li class="list-inline-item"><router-link to="/login"><button class="btn btn-outline-light">注册</button></router-link></li>
            </ul>
            <ul class="mb-0" v-else>
              <li li class="list-inline-item">
                <drop-down :title="`你好 ${user.nickName}`">
                  <dropdown-item :disable="true"><router-link to="/creat" class="dropdown-item">新建文章</router-link></dropdown-item>
                  <dropdown-item><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
                  <dropdown-item><a href="#" class="dropdown-item">退出登录</a></dropdown-item>
                </drop-down>
              </li>
            </ul>
        </nav>
    </div>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import DropDown from  './DropDown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
}
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: {
    DropDown,
    DropdownItem
  }
})
</script>

<style scoped>

</style>
