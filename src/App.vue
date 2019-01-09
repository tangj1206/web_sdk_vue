<template>
  <div id="wulai" v-if="isReady" :class="{'full-screen': fullScreen}">
    <RobotBody data-role="robot-body" :isHidden="!isOpen" :title="title" :frameShapeClassName="frameShapeClassName" :themeColor="themeColor" :avatarShapeClassName="avatarShapeClassName" :headerAvatarUrl="headerAvatarUrl"></RobotBody>
    <ToggleButton data-role="toggle-button" :isOpen="isOpen" :themeColor="themeColor" @toggle="toggle"></ToggleButton>
  </div>
</template>

<script>
  import {isObject, isString, isBoolean} from 'lodash/lang'
  // const RongIMLib = require('./assets/scripts/RongIMLib-2.3.4.min');
  import {DEFAULT_TITLE, DEFAULT_THEME_COLOR, DEFAULT_AVATAR_SHAPE_CLASS_NAME, DEFAULT_FRAME_SHAPE_CLASS_NAME, DEFAULT_CHAT_BUBBLE_CLASS_NAME, DEFAULT_HEADER_AVATAR_URL, DEFAULT_BOT_AVATAR_URL, DEFAULT_USER_AVATAR_URL} from './assets/scripts/constants'
  import RobotBody from './components/RobotBody'
  import ToggleButton from './components/ToggleButton'

  const console = window.console;

  export default {
    name: 'app',
    props: {
      pubkey: {
        type: String,
        default: '',
        require: true
      },
      // env: {
      //   type: String,
      //   default: 'prod',
      // },
      async: {
        type: Boolean,
        default: false,
      },
      autoOpen: {
        type: Boolean,
        default: true,
      },
      fullScreen: {
        type: Boolean,
        default: false,
      },
      userId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isReady: false, // sdk必要配置获取完成后才渲染节点
        isOpen: false,
        host: 'https://mplugin.wul.ai',
        MULTI_MEDIA_FILE_EXTENSIONS: [
          'amr',
          'csv',
          'doc',
          'mp4',
          'pdf',
          'ppt',
          'txt',
          'xlsx',
        ],
        isOffline: false,
        MESSAGE_TYPE_TEXT: 'MESSAGE_TYPE_TEXT',
        MESSAGE_TYPE_IMAGE: 'MESSAGE_TYPE_IMAGE',
        MESSAGE_TYPE_FILE: 'MESSAGE_TYPE_FILE',
        MESSAGE_TYPE_SHARE_LINK: 'MESSAGE_TYPE_SHARE_LINK',
        LONG_TIME_FORMAT: 'YYYY年MM月DD日 HH:mm:ss',
        SHORT_TIME_FORMAT: 'HH:mm:ss',
        title: DEFAULT_TITLE,
        themeColor: DEFAULT_THEME_COLOR,
        headerAvatarUrl: DEFAULT_HEADER_AVATAR_URL, // 默认header头像url
        botAvatarUrl: DEFAULT_BOT_AVATAR_URL, // 默认机器人头像url
        userAvatarUrl: DEFAULT_USER_AVATAR_URL, // 默认用户头像url
        avatarShapeClassName: DEFAULT_AVATAR_SHAPE_CLASS_NAME,
        frameShapeClassName: DEFAULT_FRAME_SHAPE_CLASS_NAME,
        chatBubbleClassName: DEFAULT_CHAT_BUBBLE_CLASS_NAME,
        welcome: {},
        showHistory: false,
        hasFuzzySug: false,
        sugItems: [],
        quickReplyItems: [],
        previousMessageTimestamp: Date.now(),
        previousHistoryMessageId: '',
        isQueryingHistory: false,
        hasMoreHistory: true,
        scrollViewLastScrollTop: -10,
        SCROLL_VIEW_TOP_SPACE_HEIGHT: 10,
        validMoreHistoryMessageIndex: -1,
      }
    },
    computed: {
      multiMediaFileUrlRegex() {
        const extensionGroupStr = this.MULTI_MEDIA_FILE_EXTENSIONS.map(value => '(' + value + ')').concat('([a-zA-Z\\d]+)').join('|');
        return new RegExp('^(https?:\\/\\/)?(.+)(\\.(' + extensionGroupStr + '))$', 'i')
      },
      pageConfigsApiUrl() {
        return `${this.host}/get_configure2?client=${this.pubkey}`;
      }
    },
    components: {
      RobotBody,
      ToggleButton
    },
    created() {
      this.isOpen = this.autoOpen;
      this.fetchPageConfigs();
    },
    methods: {
      async fetchPageConfigs() {
        const pageConfigsApiResult = await this.$http.get(this.pageConfigsApiUrl);
        const pageConfigsApiResultData = pageConfigsApiResult.data;
        if(pageConfigsApiResultData.code===0 && isObject(pageConfigsApiResultData.result))
        {
          const {page_config: pageConfig, interaction_config: interactionConfig} = pageConfigsApiResultData.result;
          if(isObject(pageConfig))
          {
            this.headerAvatarUrl = isString(pageConfig.header_avatar) && pageConfig.header_avatar ? pageConfig.header_avatar : this.headerAvatarUrl;
            this.title = isString(pageConfig.title) && pageConfig.title ? pageConfig.title : this.title;
            this.themeColor = isString(pageConfig.theme_color) && pageConfig.theme_color ? pageConfig.theme_color : this.themeColor;
            this.botAvatarUrl = isString(pageConfig.bot_avatar) && pageConfig.bot_avatar ? pageConfig.bot_avatar : this.botAvatarUrl;
            this.userAvatarUrl = isString(pageConfig.user_avatar) && pageConfig.user_avatar ? pageConfig.user_avatar : this.userAvatarUrl;
            this.avatarShapeClassName = pageConfig.avatar_shape===0 ? 'capsule' : 'square';
            this.frameShapeClassName = pageConfig.frame_shape===1 ? 'capsule' : 'square';
            if(pageConfig.chat_bar===2)
            {
              this.chatBubbleClassName = 'square';
            }
            else if(pageConfig.chat_bar===1)
            {
              this.chatBubbleClassName = 'capsule';
            }
            else
            {
              this.chatBubbleClassName = 'drop';
            }
          }
          if(isObject(interactionConfig))
          {
            if(isObject(interactionConfig.welcome))
            {
              this.welcome = interactionConfig.welcome;
            }
            if(isBoolean(interactionConfig.show_history))
            {
              this.showHistory = interactionConfig.show_history
            }

            if(isBoolean(interactionConfig.fuzzy_sug))
            {
              this.hasFuzzySug = interactionConfig.fuzzy_sug;
            }
          }
          this.isReady = true;
        }
      },
      toggle() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style lang="scss">
  #wulai {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    &.full-screen {
      [data-role="toggle-button"] {
        display: none;
      }
    }
    @media screen and (min-width: 1000px) {
      &:not(.full-screen) {
        [data-role="robot-body"] {
          width: 375px;
          right: 0;
          bottom: 56px;
          max-height: calc(100vh - 56px);
          /deep/ [data-role="dialog-wrapper"] {
            box-shadow: 0 36px 120px 0 rgba(66, 91, 109, 0.3);
          }
        }
      }
      &.full-screen {
        [data-role="robot-body"] {
          width: 1000px;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          /deep/ [data-role="footer"] {
            display: none;
          }
        }
      }
    }
    @media screen and (min-width: 376px) and (max-width: 999px) {
      &:not(.full-screen) {
        [data-role="robot-body"] {
          width: 375px;
          right: 0;
          bottom: 56px;
          max-height: calc(100vh - 56px);
          /deep/ [data-role="dialog-wrapper"] {
            box-shadow: 0 36px 120px 0 rgba(66, 91, 109, 0.3);
          }
        }
      }
      &.full-screen {
        [data-role="robot-body"] {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          /deep/ [data-role="footer"] {
            display: none;
          }
        }
      }
    }
    @media screen and (max-width: 375px) {
      [data-role="robot-body"] {
        width: 375px;
        right: 0;
        bottom: 56px;
        max-height: calc(100vh - 56px);
        /deep/ [data-role="footer"] {
          display: none;
        }
      }
      [data-role="toggle-button"] {
        display: none;
      }
    }
  }
</style>
