<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot/>
    </div>
    <p class="d2-page-cover__title">GXT-WorkFlow</p>
    <p class="d2-page-cover__sub-title">高新通-工作流管理平台</p>
    <slot name="footer"/>
  </div>
</template>

<style lang="scss" scoped>
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 120px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
