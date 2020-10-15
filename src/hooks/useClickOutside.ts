import { onMounted, onUnmounted, Ref, ref } from 'vue'
// ref 是 vue composition api 的一个函数，它生成一个响应式对象，
// 而 Ref 是一个类型（也就是说只有在 typescript 中才可以使用），这个类型的数据是 ref 函数调用后返回的数据类型
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isoutside = ref(false)
  const handler = (event: MouseEvent) => {
    if (elementRef.value) {
      if ((elementRef.value).contains(event.target as HTMLElement)) {
        isoutside.value = false
      } else {
        isoutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isoutside
}
export default useClickOutside
