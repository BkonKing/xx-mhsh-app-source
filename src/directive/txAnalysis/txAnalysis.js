import Vue from 'vue'

function handleClick (binding) {
  function handle () {
    setTimeout(() => {
      Vue.prototype.bdmtj.onEvent({
        eventId: binding.value.eventId,
        eventLabel: 'event'
      })
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
