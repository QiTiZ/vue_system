<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="headerCon">
          <el-card>
            <el-avatar :size="100" src="https://pic.imgdb.cn/item/62a3fba609475431292da0f9.jpg">
            </el-avatar>
            <div class="username">SSS</div>
            <div class="personal">
              <i class="el-icon-s-custom">
                <em>前端专家</em>
              </i>
              <i class="el-icon-s-platform">
                <em>阿里巴巴-前端开发</em>
              </i>
              <i class="el-icon-location-outline">
                <em>江苏省 苏州市 苏州路888号</em>
              </i>

              <el-divider></el-divider>
              <div class="tags">
                <div class="title">个性标签</div>
                <div class="main">
                  <el-tag :key="tag" v-for="tag in dynamicTags" closable
                    :disable-transitions="false" @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
                    ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                  </el-button>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="group">
                <div class="title">小组部门</div>
                <div class="main">
                  <div class="groupList" v-for="(item,i ) in group" :key="i">
                    <img :src="item.img" alt="">
                    <span>{{item.title}}</span>
                  </div>

                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="技术说明" name="1">
              <div class="desc" v-for="(item,i) in techNote" :key="i">
                <div class="titie">{{item.Mvvm}}</div>
                <div class="tag">
                  <el-tag size="mini" v-for="(tagItem,i) in item.dynamicTags" :type="tagItem.type"
                    :key="i">
                    {{tagItem.name}}
                  </el-tag>
                </div>
                <p>
                  {{item.p}}
                </p>
                <div class="time">{{item.Mvvm}} {{item.createTime}}</div>
                <div class="footer">
                  <span class="el-icon-star-off"></span>
                  <span>888</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="el-icon-headset"></span>
                  <span>9999</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="el-icon-chat-dot-square"></span>
                  <span>1024</span>
                </div>
                <el-divider></el-divider>
              </div>
            </el-tab-pane>
            <el-tab-pane label="项目视频" name="2" class="Xmvideo">
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item,i) in Xmvideo" :key="i">
                  <el-card shadow="hover">
                    <img src="https://pic.imgdb.cn/item/62a970890947543129c1120c.jpg" class="image">
                    <div class="desc">
                      <span>{{item.title}}</span>
                      <i>{{item.desc}}</i>
                      <div class="descFooter">
                        <em>{{item.createTime}}</em>
                        <div class="avator">
                          <el-avatar :size="25"
                            src="https://pic.imgdb.cn/item/62a970890947543129c1120c.jpg">
                          </el-avatar>
                          <el-avatar :size="25"
                            src="https://pic.imgdb.cn/item/62a3fba609475431292da0f9.jpg">
                          </el-avatar>
                          <el-avatar :size="25"
                            src="https://pic.imgdb.cn/item/6235231e5baa1a80ab2cb662.jpg">
                          </el-avatar>
                          <el-avatar :size="25"
                            src="https://pic.imgdb.cn/item/62a970890947543129c1120c.jpg">
                          </el-avatar>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      dynamicTags: ['大佬', '菜鸟', '技术好', '不加班', '不熬夜', '早睡早起'],
      inputVisible: false,
      inputValue: '',
      group: [],
      activeName: '1',
      techNote: [],
      Xmvideo: []
    }
  },
  created() {
    this.getTechnoteList()
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async getTechnoteList() {
      const { data: res1 } = await axios.get(
        'https://mock.apifox.cn/m1/831144-0-default/person/index',
        {
          params: {
            apifoxToken: '3MLUl0vd62ogpwPyL6ZxQ3z2luegg4FD'
          }
        }
      )

      this.group = res1

      const { data: res } = await axios.get(
        'https://mock.apifox.cn/m1/831144-0-default/user/index',
        {
          params: {
            apifoxToken: '3MLUl0vd62ogpwPyL6ZxQ3z2luegg4FD'
          }
        }
      )

      this.techNote = res
    },
    async handleClick(tab) {
      if (tab.index === '1') {
        const { data: res } = await axios.get(
          'https://mock.apifox.cn/m1/831144-0-default/user/list',
          {
            params: {
              apifoxToken: '3MLUl0vd62ogpwPyL6ZxQ3z2luegg4FD'
            }
          }
        )

        this.Xmvideo = res
      }
    }
  }
}
</script>

<style lang="less" scoped>
.headerCon {
  text-align: center;
  .username {
    margin-top: 15px;
  }
  .personal {
    text-align: left;
    font-size: 13px;
    i {
      display: block;
      font-style: normal;
      margin: 10px 0;
      em {
        margin-left: 7px;
        font-style: normal;
      }
    }
  }
  .tags {
    .title {
      font-size: 16px;
    }
    .main {
      margin-top: 20px;
    }
  }
  .group {
    .title {
      font-size: 16px;
    }
    .main {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      .groupList {
        display: flex;
        align-items: center;
        width: 50%;
        margin-bottom: 10px;
        img {
          width: 30px;
          height: 30px;
        }
        span {
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
  }
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.desc {
  margin: 10px;
  .titie {
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
  }
  .time {
    text-align: right;
    font-size: 14px;
    color: #999;
  }
  .footer {
    color: #666;
    span {
      margin: 0 3px;
    }
  }
}

.Xmvideo {
  ::v-deep .el-card__body,
  .el-main {
    padding: 0 !important;
  }
  .image {
    width: 100%;
    height: 230px;
  }
  .desc {
    span {
      display: block;
      margin-bottom: 5px;
    }
    i {
      display: block;
      font-style: normal;
      font-size: 10px;
    }
    .descFooter {
      margin-top: 20px;
      display: flex;
      align-items: center;
      position: relative;
      em {
        font-style: normal;
        font-size: 10px;
        color: #999;
      }
      .avator {
        display: flex;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
