<template>
  <a class="footer" href="http://wul.ai" target="_blank">
    <div class="icon"></div>
    <div class="text">吾来智能助理</div>
  </a>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped lang="scss">
  .footer {
    display: flex;
    margin: 8px auto;
    font-size: 12px;
    line-height: 2;
    align-items: center;
    background: #f5f7f7;
    border-radius: 1em;
    padding: 0 8px;
    text-decoration: none;
    .icon {
      width: 14px;
      height: 14px;
      background: url(../assets/images/icon_wulai_small_gray@3x.png) 0 / 100% no-repeat;
      margin-right: 8px;
    }
    .text {
      color: #b3bdc5;
    }
    &:hover {
      .icon {
        background: url(../assets/images/icon_wulai_small_red@3x.png) 0 / 100% no-repeat;
      }
      .text {
        color: #425b6d;
      }
    }
  }
</style>
