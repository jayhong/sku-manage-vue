<template>
  <div class="m-index">
    <p>欢迎使用 <span :style="{fontSize: '30px',color:'#409eff',padding: '0 2px'}">库存管理系统</span></p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
  .m-index p{
    font-size: 20px;
    text-align: center;
    margin-top: 20%;
  }
</style>
