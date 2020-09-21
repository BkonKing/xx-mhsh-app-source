const longtap = {
  bind: function (el, binding, vNode) {
    // 确保提供的表达式是函数
    const { tap, params } = binding.value
    if (typeof tap !== 'function') {
      // 获取组件名称
      const compName = vNode.context.name
      // 将警告传递给控制台
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `
      if (compName) {
        warn += `Found in component '${compName}' `
      }

      console.warn(warn)
    }

    // 定义变量
    let pressTimer = null

    // 定义函数处理程序
    // 创建计时器（ 1秒后执行函数 ）
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 执行函数
          handler()
        }, 1000)
      }
    }

    // 取消计时器
    const cancel = (e) => {
      // 检查计时器是否有值
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    // 运行函数
    const handler = (e) => {
      // 执行传递给指令的方法
      tap(params, e)
    }

    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)

    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
}

const install = function (Vue) {
  Vue.directive('longtap', longtap)
}

if (window.Vue) {
  window.longtap = longtap
  Vue.use(install); // eslint-disable-line
}

longtap.install = install
export default longtap
