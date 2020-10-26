export default {
  bind: function (el, binding) {
    const throttleTime = binding.value || 1000 // 节流时间
    el.addEventListener('click', () => {
      setTimeout(() => {
        if (!el.disabled) {
          const tagName = el.tagName
          el.disabled = true
          if (tagName !== 'BUTTON') {
            // 设置一下相当于该元素已经不存在了，会触发外层点击事件
            el.style.pointerEvents = 'none'
          }
          setTimeout(() => {
            el.disabled = false
            el.style.pointerEvents = ''
          }, throttleTime)
        }
      }, 0)
    }, true)
  }
}
