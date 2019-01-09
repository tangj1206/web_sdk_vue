### 快速开始

1. # 引入

   在html的head标签中引入cdn上的wulai.min.js(*CDN上始终为最新稳定版本)

   ```
    <script src="https://pm.wul.ai/static/release/WEB_SDK/wulai.min.js"></script>
   ```

2. # 初始化 


   在body标签内添加如下代码

   ```
   <script>
   		var wulai = new WuLai({
   			pubkey: '请输入PubKey', // 吾来平台PubKey
   			async: false, // 是否使用异步方式接入吾来平台
   			autoOpen: true, // 是否自动打开
   			fullScreen: false, // 是否全屏
   			userId: 'test010', // 用户ID
   		});
   </script>
   ```

3. # 参数说明

| 参数名     | 说明                         | 是否必填项                         | 缺省值 | 备注 |
| :--------- | :--------------------------- | :-----------------------------------: | :--------: | :--------- |
| pubkey     | 吾来平台pubkey               | 是 | - | 字符串，必须是从吾来平台获取的有效PubKey |
| async      | 是否使用异步方式接入吾来平台 | 否                | false | true/false |
| userId   | 用户ID                 | 是 | - | 请提供<u>*非空且唯一*</u>的字符串，相同的userId在同一时间只能给一个网页使用，否则会被融云视为多端登录，导致消息发送失败。 |
| autoOpen | 是否自动打开               | 否                           | true | true/false |
| fullScreen | 是否全屏 | 否 | false | true/false |

