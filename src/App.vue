<template>
  <div class="container-fluid px-0 bg-primary">
    <GlobalHeader :user='userData'></GlobalHeader>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from  './components/GlobalHeader.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore()
    const userData = computed(() => store.state.user)
    return {
      userData
    }
  }
})
</script>

<style>
</style>
