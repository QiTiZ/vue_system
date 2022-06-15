<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="headerCon">
          <el-card>
            <el-avatar :size="100" src="https://pic.imgdb.cn/item/62a3fba609475431292da0f9.jpg">
            </el-avatar>
            <div class="username">ZSS</div>
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
export default {
  name: '',
  data() {
    return {
      dynamicTags: ['大佬', '菜鸟', '技术好', '不加班', '不熬夜', '早睡早起'],
      inputVisible: false,
      inputValue: '',
      group: [
        {
          title: '前端开发组',
          img: 'https://v3.cn.vuejs.org/logo.png'
        },
        {
          title: 'UI设计组',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        },
        {
          title: '测试组',
          img: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png'
        },
        {
          title: '运维组',
          img: 'https://www.runoob.com/wp-content/uploads/2013/10/bs.png'
        },
        {
          title: '支付组',
          img: 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico'
        },
        {
          title: '技术支持组',
          img: 'https://vitejs.cn/logo.svg'
        }
      ],
      activeName: '1',
      techNote: [
        {
          Mvvm: 'Vue',
          dynamicTags: [
            { name: 'Vue', type: '' },
            { name: 'ELement-Ui', type: 'success' },
            { name: '前端框架', type: 'info' }
          ],
          createTime: '2022-06-15 10:52',
          p: '主题：ElementUI是一套基于Vue的桌面端组件库，ElementUI提供了丰富的组件帮助开发人员快速构建功能强大、风格统一的页面。'
        },
        {
          Mvvm: 'React',
          dynamicTags: [
            { name: 'React', type: '' },
            { name: 'Ant-Ui', type: 'success' },
            { name: '前端框架', type: 'info' }
          ],
          createTime: '2022-02-05 11:52',
          p: '主题：React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。'
        },
        {
          Mvvm: 'JavaScript',
          dynamicTags: [
            { name: 'JavaScript', type: '' },
            { name: '脚本语言', type: 'success' },
            { name: '动态性', type: 'info' }
          ],
          createTime: '2022-03-18 01:18',
          p: '主题：JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程范式。'
        },
        {
          Mvvm: 'BootStrap',
          dynamicTags: [
            { name: 'BootStrap', type: '' },
            { name: 'Less', type: 'success' },
            { name: 'JavaScript 插件', type: 'info' }
          ],
          createTime: '2022-04-22 05:24',
          p: '主题：Bootstrap是美国Twitter公司的设计师Mark Otto和Jacob Thornton合作基于HTML、CSS、JavaScript 开发的简洁、直观、强悍的前端开发框架，使得 Web 开发更加快捷。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。'
        },
        {
          Mvvm: 'Vite',
          dynamicTags: [
            { name: 'Vite', type: '' },
            { name: 'ESM', type: 'success' },
            { name: '速度极快', type: 'info' }
          ],
          createTime: '2022-05-17 17:52',

          p: '主题：Vite是下一代前端开发与构建工具。Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API 带来了高度的可扩展性，并有完整的类型支持'
        },
        {
          Mvvm: 'Vant',
          dynamicTags: [
            { name: 'Vant', type: '' },
            { name: 'Vant-Ui', type: 'success' },
            { name: '前端框架', type: 'info' }
          ],
          createTime: '2022-06-15 19:34',

          p: '主题：Vant 是一个轻量、可靠的移动端组件库，于 2017 年开源。'
        },
        {
          Mvvm: 'Webpack',
          dynamicTags: [
            { name: 'Webpack', type: '' },
            { name: '打包工具', type: 'success' }
          ],
          createTime: '2022-06-23 22:22',

          p: '主题：webpack 是代码编译工具，有入口、出口、loader 和插件。webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。'
        }
      ],
      Xmvideo: [
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',

          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        },
        {
          title: '去见想见的人',
          createTime: '一天前',
          desc: '去见你的路上 风都是甜的 如果是去见你那我会用跑的 如果关于你那肯定都是好的'
        }
      ]
    }
  },
  created() {},
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
    handleClick(tab, event) {
      console.log(tab, event)
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
