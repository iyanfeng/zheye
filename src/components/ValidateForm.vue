<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="button" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
type validateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: validateFunc[] = []
    const callback = (func?: validateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-creat', callback)
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(item => item)
      context.emit('form-submit', result)
    }
    onUnmounted(() => {
      emitter.off('form-item-creat', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
<style scoped>

</style>
