import txAnalysis from './txAnalysis'

const install = function (Vue) {
  Vue.directive('txAnalysis', txAnalysis)
}

if (window.Vue) {
  window.txAnalysis = txAnalysis
  Vue.use(install); // eslint-disable-line
}

txAnalysis.install = install
export default txAnalysis
