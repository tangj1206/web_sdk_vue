<template>
  <div class="dialog-title" :style="{background: themeColor}">
    <div class="header-img-container" :class="avatarShapeClassName">
      <img class="header-img" :src="headerAvatarUrl">
    </div>
    <div class="title-text">{{title}}</div>
  </div>
</template>

<script>
  import {DEFAULT_TITLE, DEFAULT_THEME_COLOR, DEFAULT_AVATAR_SHAPE_CLASS_NAME, DEFAULT_HEADER_AVATAR_URL} from '../assets/scripts/constants'

  export default {
    name: "DialogTitle",
    props: {
      themeColor: {
        type: String,
        default: DEFAULT_THEME_COLOR
      },
      avatarShapeClassName: {
        type: String,
        default: DEFAULT_AVATAR_SHAPE_CLASS_NAME
      },
      headerAvatarUrl: {
        type: String,
        default: DEFAULT_HEADER_AVATAR_URL
      },
      title: {
        type: String,
        default: DEFAULT_TITLE
      },
    }
  }
</script>

<style scoped lang="scss">
  .dialog-title {
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    .header-img-container {
      width: 36px;
      height: 36px;
      overflow: hidden;
      .header-img {
        width: 100%;
        height: 100%;
      }
      &.square {
        border-radius: 4px;
      }
      &.capsule {
        border-radius: 50%;
      }
    }
    .title-text {
      flex: 1;
      padding: 0 1em;
    }
  }
</style>
