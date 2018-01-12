<template>
  <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
    
    export default {
        data () {
            return {
              
            }
        }
    }  
</script>

<style lang="scss">
  html, body {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB',
                   'Microsoft YaHei','微软雅黑',Arial,sans-serif;
    background: #f3f3f3;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
  }

  table {
    border-collapse: separate;
  }
</style>
