function imgLoad (el, binding) {
  api.imageCache({
    url: binding.value,
    policy: 'cache_only'
  },
  function (ret, err) {
    if (ret && ret.status) {
      el.src = ret.url
    }
  }
  )
}

export default {
  bind (el, binding) {
    if (process.env.VUE_APP_IS_APP === '1') {
      if (el.nodeName === 'IMG') {
        el.onload = imgLoad(el, binding)
      } else {
        const obj = el.getElementsByTagName('img')[0]
        if (obj) {
          obj.onload = imgLoad(obj, binding)
        }
      }
    }
  }
}
