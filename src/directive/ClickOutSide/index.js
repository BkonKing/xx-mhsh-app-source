import ClickOutSide from './ClickOutSide'

const install = function (Vue) {
  Vue.directive('ClickOutSide', ClickOutSide)
}

if (window.Vue) {
  window.ClickOutSide = ClickOutSide
  Vue.use(install); // eslint-disable-line
}

ClickOutSide.install = install
export default ClickOutSide
