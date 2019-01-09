<template>
	<div class="robot-body" :class="{hidden: isHidden}" v-show="isShow">
		<DialogWrapper data-role="dialog-wrapper" :title="title" :frameShapeClassName="frameShapeClassName" :themeColor="themeColor" :avatarShapeClassName="avatarShapeClassName" :headerAvatarUrl="headerAvatarUrl"></DialogWrapper>
		<Footer data-role="footer"></Footer>
	</div>
</template>

<script>
	import {DEFAULT_TITLE, DEFAULT_FRAME_SHAPE_CLASS_NAME, DEFAULT_THEME_COLOR, DEFAULT_AVATAR_SHAPE_CLASS_NAME, DEFAULT_HEADER_AVATAR_URL} from '../assets/scripts/constants'

	import DialogWrapper from './DialogWrapper'
	import Footer from './Footer'

	export default {
		name: "RobotBody",
		props: {
			isHidden: {
				type: Boolean,
        default: false,
			},
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
    data() {
      return {
        isShow: true,
      }
    },
		components: {
			DialogWrapper,
			Footer,
		},
		watch: {
      isHidden(newValue) {
        window.setTimeout(() => {
          this.isShow = !newValue
        }, 200)
      }
    },
	}
</script>

<style scoped lang="scss">
	.robot-body {
		position: fixed;
		z-index: 900000;
		display: flex;
		flex-direction: column;
		font-family: PingFangSC, AvenirNext, Arial, Helvetica, sans-serif;
		font-size: 14px;
		font-weight: 500;
		font-style: normal;
		font-stretch: normal;
		height: 668px;
		max-height: 100vh;
		transition: all 200ms ease-in-out;
		&.hidden {
			transform: translateY(20px);
			opacity: 0;
			/*height: 0;*/
			/*width: 0;*/
			z-index: -1;
		}
	}
</style>
