import Vue from 'vue'

function handleClick (binding) {
  function handle () {
    setTimeout(() => {
      Vue.prototype.txAnalysis.trackCustom({ event: binding.value, props: {} })
    }, 0)
  }
  return handle
}

export default {
  bind (el, binding) {
    el.addEventListener('click', handleClick(binding), false)
  },
  unbind (el) {
    el.removeEventListener('click', handleClick, false)
  }
}
