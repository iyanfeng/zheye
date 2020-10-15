<template>
  <div class="artical-container">
    <div class="row artical-row">
      <div class="col-6 py-5">
        <img class="w-50" src="../assets/callout.svg">
        <h2 class="py-3">随心写作, 自由表达</h2>
        <router-link to='/creat' class="btn btn-primary">开始写文章</router-link>
      </div>
    </div>
    <div class="column-container">
      <h4 class="text-center mb-4 font-weight-bold">发现精彩</h4>
      <column-list :list="list"></column-list>
    </div>
    <div class="more-artical">
      <button class="btn btn-outline-primary w-25">加载更多</button>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, computed, nextTick } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchColums')
    })
    const list = computed(() => store.state.column)
    console.log('list', list)
    return {
      list
    }
  }
})
</script>
<style>
.artical-row{
  text-align: center;
  justify-content: center;
}
.more-artical{
  width: 100%;
  text-align: center;
  margin: 2rem 0;
}
</style>
