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
                <el-switch v-model="item.staus" :active-value="1" :inactive-value="0">
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
import axios from 'axios'
// import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      securityData: [],
      messageSetting: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // ?
    async getList() {
      const { data: res1 } = await axios.get(
        'https://mock.apifox.cn/m1/831144-0-default/person/security',
        {
          params: {
            apifoxToken: '3MLUl0vd62ogpwPyL6ZxQ3z2luegg4FD'
          }
        }
      )

      this.securityData = res1

      const { data: res } = await axios.get(
        'https://mock.apifox.cn/m1/831144-0-default/person/setting',
        {
          params: {
            apifoxToken: '3MLUl0vd62ogpwPyL6ZxQ3z2luegg4FD'
          }
        }
      )

      this.messageSetting = res
    }
  }
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
