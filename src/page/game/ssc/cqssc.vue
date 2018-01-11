<template>
    <div class="container">
      <lt-game-title></lt-game-title>
      <lt-game-top-info :options="topInfoOptions"></lt-game-top-info>
      <div class="line"></div>
      <lt-game-top-result :options="topResultOptions"></lt-game-top-result>
      <lt-game-top-result-for-keno :options="topResultForKenoOptions"></lt-game-top-result-for-keno>
    </div>
</template>

<script>
    import LtGameTitle from '../../../components/common/demo/title'
    import LtGameTopInfo from '../../../components/common/demo/topInfo'
    import LtGameTopResult from '../../../components/common/demo/topResult'
    import LtGameTopResultForKeno from '../../../components/common/demo/topResultForKeno'

    export default {
      data(){
        return {
          titleOptions:{
            title:'测试',
            playtype:'类型一'
          },
          topInfoOptions:{
            date:{
              ltDateNumber:'20180110088',
              totalSeconed:3605
            },
            validTotalBalance:1088888,
            isHideBalance:false
          },
          topResultOptions:{
            ltDateNumber:'20180110088',
            data:[11,2,12,3,4,5,6,7,8,9,0]
          },
          topResultForKenoOptions:{
            ltDateNumber:'20180110088',
            data:[11,2,12,3,4,25,26,7,28,9,0,11,2,12,13,4,25,6,7,8,9],
            
          }
        }
      },
      components:{LtGameTitle,LtGameTopInfo,LtGameTopResult,LtGameTopResultForKeno},
      methods:{

      }
    }
</script>

<style lang="less" scoped>
  .container {

    .line {
      height: 1px;
    }
  }
</style>
