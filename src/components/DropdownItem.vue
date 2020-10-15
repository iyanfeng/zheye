<template>
    <li :class="['dropdown-option',{'is-disable':disable}]">
        <slot></slot>
    </li>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style scoped>
.dropdown-option.is-disable * {
  color: #6c757d;
  pointer-events: none;
}
</style>
