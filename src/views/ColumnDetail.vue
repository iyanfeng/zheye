<template>
  <div class="colunm-detail w-690">
    <div class="card mb-3 border-0">
      <div class="row no-gutters border-bottom align-items-center">
        <div class="col-md-3">
          <img :src="targetColumn.avatar && targetColumn.avatar.url" class="card-img rounded-circle">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">{{targetColumn.title}}</h5>
            <p class="card-text">{{targetColumn.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="post-list">
      <div class="list-item" v-for="item of testPosts" :key="item.id">
        <h5 class="item-title">{{item.title}}</h5>
        <div class="item-content">
          <div class="item-image">
            <img :src="item.image.url"/>
          </div>
          <div class="content-text">{{item.excerpt}}</div>
        </div>
        <p class="item-time">{{item.createdAt}}</p>
      </div>
    </div>
    <div class="more-colunm">
      <button type="button" class="btn btn-outline-primary w-25">加载更多</button>
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Column',
  setup () {
    const route = useRoute()
    const store = useStore()
    const routeId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColum', routeId)
      store.dispatch('fetchPosts', routeId)
    })
    const targetColumn = computed(() => {
      const colunm = store.state.column
      return colunm[0]
    })
    const postsData = computed(() => {
      return store.state.posts
    })
    return {
      route,
      targetColumn: targetColumn,
      testPosts: postsData
    }
  }
})
</script>
<style scoped>
.list-item{
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
  margin-bottom: 1rem;
  padding: 1rem;
}
.item-content{
  display: flex;
  margin: 1rem 0;
}
.item-image{
  flex: 4;
  margin-right: 1rem;
  border-radius: 0.3rem;
}
.item-image>img{
  width: 100%;
  height: 100%；
}
.content-text{
  flex: 8;
}
.more-colunm{
  text-align: center;
  margin-bottom: 2rem;
}
.w-690{
  width: 690px;
  margin: 0 auto;
}
.card-img{
  width: 100px;
  height: 100px;
}
</style>
