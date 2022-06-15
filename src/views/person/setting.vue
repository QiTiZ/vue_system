<template>
  <div>
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="安全设置">
          <div class="main">
            <div class="title">
              安全设置
            </div>
            <div class="security" v-for="(item,i) in securityData" :key="i">
              <div class="left">
                <span>{{item.title}}</span>
                <i>{{item.subTitle}}</i>
              </div>
              <div class="right">
                <a href="JavaScript:;">修改</a>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <div class="main">
            <div class="title">
              消息通知
            </div>
            <div class="security" v-for="(item,i) in messageSetting" :key="i">
              <div class="left">
                <span>{{item.title}}</span>
                <i>{{item.subTitle}}</i>
              </div>
              <div class="right">
                <el-switch v-model="item.staus" :active-value="1" :inactive-color="0">
                </el-switch>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      value: true,
      securityData: [
        {
          title: '账号密码',
          subTitle: '当前密码强度: 强'
        },
        {
          title: '密保手机',
          subTitle: '已绑定手机：138****8293'
        },
        {
          title: '密保问题',
          subTitle: '未设置密保问题，密保问题可有效保护账户安全'
        },
        {
          title: '登录设备',
          subTitle: 'IPhone 13 Pro Max'
        },
        {
          title: '邮箱',
          subTitle: '8888888@163.com'
        }
      ],
      messageSetting: [
        {
          title: '账号通知',
          staus: 1,
          subTitle: '其他用户的消息将以站内信的形式通知'
        },
        {
          title: '系统消息',
          staus: 0,
          subTitle: '系统消息将以站内信的形式通知'
        },
        {
          title: '待办任务',
          staus: 1,
          subTitle: '待办任务将以站内信的形式通知'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.main {
  padding: 8px;
  .title {
    font-size: 20px;
    margin-bottom: 25px;
  }
  .security {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    .left {
      span {
        display: block;
        margin-bottom: 10px;
      }
      i {
        font-style: normal;
        color: #999;
        font-size: 14px;
      }
    }
    .right {
      a {
        color: #409eff;
      }
    }
  }
}
</style>
