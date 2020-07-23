<template>
	<view>
		<uni-segmented-control style="background-color: #fff;" :current="current" :values="items" @clickItem="onClickItem"
		  style-type="text" active-color="#EB5841">
        <uni-badge class="badge" text="2" type="error"></uni-badge>
      </uni-segmented-control>
      <message-list type="transaction" v-show="current === 0"></message-list>
      <interaction v-show="current === 1"></interaction>
      <message-list type="butler" v-show="current === 2"></message-list>
      <message-list type="activity" v-show="current === 3"></message-list>
      <message-list type="system" v-show="current === 4"></message-list>
      <message-list type="work" v-show="current === 5"></message-list>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
import messageList from './components/message-list.nvue'
import interaction from './components/interaction.nvue'
import uniBadge from '@/components/uni-badge/uni-badge.vue'
export default {
  components: {
    uniSegmentedControl,
    messageList,
    interaction,
    uniBadge
  },
  data () {
    return {
      items: ['交易', '互动', '物业', '活动', '系统', '工作'],
      current: 0
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    }
  }
}
</script>

<style lang="less">

</style>
