<template>
  <div class="row">
    <div class="col-4 mb-3" v-for="item of columnList" :key="item._id">
        <div class="card shadow-sm h-100">
            <div class="card-body text-center">
                <img :src="item.avatar && item.avatar.url" class="card-img-top rounded-circle my-3" alt="">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text text-justify">{{item.description}}</p>
                <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary go-clounm">进入专栏</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map((item) => {
        if (!item.avatar) {
          item.avatar = {
            url: './assets/avatar.jpg'
          }
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-body img{
    width: 50px;
    height: 50px;
}
.card-body{
  padding-bottom: 3rem;
}
.go-clounm{
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
