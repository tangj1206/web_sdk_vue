<template>
  <div class="toggle-button" :class="{close: isOpen}" :style="{background: themeColor}" @click="toggle">
    <img class="icon close_icon" :src="SWITCH_BUTTON_OPEN_SRC">
    <img class="icon open_icon" :src="SWITCH_BUTTON_CLOSE_SRC">
  </div>
</template>

<script>
  export default {
    name: "ToggleButton",
    props: {
      isOpen: {
        type: Boolean,
      },
      themeColor: {
        type: String,
        default: '#1f8fff'
      }
    },
    data() {
      return {
        SWITCH_BUTTON_OPEN_SRC: require('../../src/assets/images/icon_bot@3x.png'),
        SWITCH_BUTTON_CLOSE_SRC: require('../../src/assets/images/icon_off@3x.png')
      }
    },
    methods: {
      toggle() {
        this.$emit('toggle')
      }
    }
  }
</script>

<style scoped lang="scss">
  .toggle-button {
    width: 64px;
    height: 64px;
    background: #1f8fff;
    color: #fff;
    line-height: 64px;
    border-radius: 50%;
    box-shadow: 0 8px 16px 0 rgba(66, 91, 109, 0.3);;
    cursor: pointer;
    position: fixed;
    right: 16px;
    bottom: 16px;
    overflow: hidden;
    z-index: 900001;
    .icon {
      display: block;
      width: 48px;
      height: 48px;
      position: absolute;
      left: 50%;
      top: 50%;
      transition: all 200ms ease-in-out;
    }
    &:not(.close) .close_icon {
      opacity: 1;
      transform: rotate(0) translate(-50%, -50%) scale(1);
    }
    &:not(.close) .open_icon {
      opacity: 0;
      transform: rotate(45deg) translate(-50%, -50%) scale(0);
    }
    &.close .close_icon {
      opacity: 0;
      transform: rotate(-45deg) translate(-50%, -50%) scale(0);
    }
    &.close .open_icon {
      opacity: 1;
      transform: rotate(0) translate(-50%, -50%) scale(1);
    }
  }
</style>
