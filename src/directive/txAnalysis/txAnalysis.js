import Vue from 'vue'
import store from '../../store'
import { setStatisticsData } from '@/utils/analysis.js'

function handleClick (binding) {
  function handle () {
    setTimeout(() => {
      setStatisticsData(3, { 'event_id': binding.value.eventId})
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
