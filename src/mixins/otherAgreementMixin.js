import { getNeighboursAgreement } from '@/api/home'

export default {
  data () {
    return {
      otherAgreement: {}
    }
  },
  created () {
    this.getAgreement()
  },
  methods: {
    getAgreement () {
      getNeighboursAgreement({ article_type: 2 }).then(({ data }) => {
        this.otherAgreement = data
      })
    }
  }
}
