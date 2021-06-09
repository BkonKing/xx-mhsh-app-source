<template>
  <tf-map
    btnText="返回商家"
    :destinationInfo="cinemaInfo"
    @init="getCinemaPosition"
  ></tf-map>
</template>

<script>
import tfMap from '@/components/tf-map'
import { getCinemaPosition } from '@/api/movie'
export default {
  components: {
    tfMap
  },
  data () {
    return {
      cinemaId: '',
      cinemaInfo: {}
    }
  },
  created () {
    this.cinemaId = this.$route.query.id
  },
  methods: {
    // 获取影院信息
    getCinemaPosition ({ lon, lat }) {
      getCinemaPosition({
        cinema_id: this.cinemaId,
        lat: lat,
        lng: lon
      }).then(({ data }) => {
        this.cinemaInfo = {
          name: data.cinema_name,
          address: data.address,
          lon: data.longitude,
          lat: data.latitude
        }
      })
    }
  }
}
</script>
