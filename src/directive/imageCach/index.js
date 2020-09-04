import imageCach from './imageCach'

const install = function (Vue) {
  Vue.directive('imageCach', imageCach)
}

if (window.Vue) {
  window.imageCach = imageCach
  Vue.use(install); // eslint-disable-line
}

imageCach.install = install
export default imageCach
