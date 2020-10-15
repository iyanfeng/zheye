<template>
  <div class="validate-input-container">
     <input v-if="tag!='textarea'" v-bind="$attrs" :value="inputRef.val" @input="updateValue" @blur="handleValidateInput" :class="['form-control', {'is-invalid': inputRef.error}]" id="exampleInputEmail1">
     <textarea v-else v-bind="$attrs" :value="inputRef.val" @input="updateValue" @blur="handleValidateInput" :class="['form-control', {'is-invalid': inputRef.error}]" id="exampleInputEmail1"></textarea>
     <span class="invalid-feedback" v-if="inputRef.error">{{inputRef.message}}</span>
  </div>
</template>
<script lang= 'ts'>
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
export interface RuleProp {
  type: 'required' | 'email';
  message: string;
}
export type TagType = 'input' | 'textarea'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RuleProp[]>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue ||  '',
      error: false,
      message: ''
    })
    const updateValue = (event: KeyboardEvent) => {
      const targetValue = (event.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const handleValidateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((ruleItem) => {
          let passed = true
          inputRef.message = ruleItem.message
          switch (ruleItem.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-creat', handleValidateInput)
    })
    return {
      handleValidateInput,
      inputRef,
      updateValue
    }
  }
})
</script>
<style scoped>

</style>
