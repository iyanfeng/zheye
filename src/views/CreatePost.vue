<template>
  <div class="creatPost">
    <div class="upload">
      <h4>新建文章</h4>
    </div>
    <validate-form @form-submit="publish">
      <div class="title mb-3 form-group">
        <label for="exampleInputEmail1">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题"></validate-input>
      </div>
      <div class="detail mb-3 form-group">
        <label for="exampleInputEmail1">文章详情：</label>
        <validate-input :tag="'textarea'"  rows="10" :rules="detailRules" v-model="detailVal" placeholder="请输入文章详情"></validate-input>
      </div>
      <template #submit>
        <button type="button" class="btn btn-primary">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import ValidateInput from '../components/validateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export default defineComponent({
  name: 'CreatePosts',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleRules = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const detailRules = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const titleVal = ref('')
    const detailVal = ref('')
    const store = useStore()
    const router = useRouter()
    const publish = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        const newPost: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: detailVal.value,
          createdAt: new Date().toLocaleString(),
          columnId: 1
        }
        store.commit('pushPost', newPost)
        router.push({ path: `/column/${columnId}` })
        console.log(router)
      }
    }
    return {
      titleRules,
      titleVal,
      detailRules,
      detailVal,
      publish
    }
  }
})
</script>
<style scoped>

</style>
