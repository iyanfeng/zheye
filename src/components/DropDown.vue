<template>
    <div class="dropdown" ref="dropdownref">
        <a href="#"><button class="btn btn-outline-light dropdown-toggle" @click="changeOpen">{{title}}</button></a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" v-show="isOpen" :style="{'display':'block'}">
            <slot></slot>
        </div>
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const changeOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownref = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownref)
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      changeOpen,
      dropdownref
    }
  }
})
</script>
<style scoped>

</style>
