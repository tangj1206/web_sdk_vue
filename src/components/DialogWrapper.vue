<template>
  <div class="dialog-wrapper" :class="frameShapeClassName">
    <DialogTitle :title="title" :frameShapeClassName="frameShapeClassName" :themeColor="themeColor" :avatarShapeClassName="avatarShapeClassName" :headerAvatarUrl="headerAvatarUrl"></DialogTitle>
  </div>
</template>

<script>
  import {DEFAULT_TITLE, DEFAULT_FRAME_SHAPE_CLASS_NAME, DEFAULT_THEME_COLOR, DEFAULT_AVATAR_SHAPE_CLASS_NAME, DEFAULT_HEADER_AVATAR_URL} from '../assets/scripts/constants'

  import DialogTitle from './DialogTitle'

  export default {
    name: "DialogWrapper",
    props: {
      frameShapeClassName: {
        type: String,
        default: DEFAULT_FRAME_SHAPE_CLASS_NAME
      },
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
    },
    components: {
      DialogTitle,
    }
  }
</script>

<style scoped lang="scss">
  .dialog-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #eceef0;
    overflow: hidden;
    &.square {
      border-radius: 8px;
    }
    &.capsule {
      border-radius: 32px;
    }
  }
</style>
