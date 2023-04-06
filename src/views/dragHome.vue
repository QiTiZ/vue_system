<template>
  <div id="darag" style="height: 100%">
    <!-- 组件库 -->
    <section class="left">
      <!--标题-->
      <div>vscode测试</div>
      <h4>组件库</h4>
      <ul @dragend="dragEnd" @dragstart="dragStart">
        <!-- 添加自定义属性 data-type -->
        <li v-for="(val, key, index) in typeList" :key="index + 1" :data-type="key" draggable>
          <span :class="val.icon"></span>
          <p>{{ val.name }}</p>
        </li>
      </ul>
    </section>
    <!-- 展示区域 -->
    <section ref="main" class="main">
      <!--      <div class="top-nav" @click="selectType(0)">-->
      <!--        <img src="../../src/assets/images/topNavBlack.png"/>-->
      <!--      </div>-->
      <div class="view-content" @dragover="dragOver" @drop="drog">
        <Draggable v-model="view" chosenClass="chosen" draggable=".item">
          <template v-for="(item, index) in view">
            <div v-if="index > 0" :key="index" :data-index="index" class="item"
              @click="selectType(index)">
              <!-- waiting -->
              <template v-if="item.status && item.status == 2">
                <div class="wait">组件放置区域</div>
              </template>
              <template v-else>
                <component :is="typeList[item.type]['com']" :className="className[item.tabType]"
                  :data="item" :val="item.val"></component>
              </template>
              <i class="el-icon-error" @click="deleteItem($event, item,index)"></i>
            </div>
          </template>
        </Draggable>
      </div>

    </section>
    <!-- 描述信息 -->
    <section class="right">
      <!-- 动态修改内容区域的值 -->
      <div class="right_btn">
        <el-button type="primary" @click="submit">新增模板</el-button>
        <el-button type="success" @click="changeDrag">更新模板</el-button>
        <el-button type="danger" @click="editDrag">删除模板</el-button>

        <div class="tag">
          <el-button round type="info" @click="defaultOne">默认模板一</el-button>
          <el-button round type="warning" @click="defaultTwo">默认模板二</el-button>
          <el-button round @click="defaultThree">默认模板三</el-button>
          <el-button round @click="noneTemplate">空白模板</el-button>
        </div>

        <div class="dragIpt">
          <el-input v-model="getDragId" placeholder="请输入模板ID"></el-input>
          <el-button type="primary" @click="getTemplate">获取模板</el-button>
        </div>
      </div>
      <Index v-if="isRight" :data="props" :val="props.val" @updateDataVal="updateDataVal"></Index>
    </section>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
// 文本
import text from "@/components/main/text/text.vue";
// 图片
import image from "@/components/main/image/image.vue";
// 多列
import doubleText from "@/components/main/text/doubleTetx.vue";
// 分割线
import Divider from "@/components/main/divider/divider.vue";
// 六列
import sixText from "@/components/main/text/sixText.vue";
import fiveText from "@/components/main/text/five.vue";
// 二维码
import Code from "@/components/main/qr/code.vue";
// 模拟文件
// import dragJs from '@/mixins/drag'
// 文本域
import textArea from "@/components/main/text/textArea.vue";
// 空白
import none from "@/components/main/text/none.vue";
// 条形码
import barCode from "@/components/main/code/barcode.vue";

import Index from "@/components/Edit/index.vue";

export default {
  components: {
    Draggable,
    text,
    image,
    Index: Index,
    doubleText,
    Divider,
    sixText,
    Code,
    textArea,
    barCode,
    none,
    fiveText,
  },
  data() {
    return {
      label: "测试组件",
      // 左侧组件库数据
      typeList: {
        // 存放每个组件的数据结构
        TEXT: {
          name: "一个",
          type: "TEXT",
          icon: "el-icon-document-remove",
          com: text,
        },
        doubletext: {
          name: "一行两列",
          type: "TEXT",
          icon: "el-icon-tickets",
          com: doubleText,
        },
        sixText: {
          name: "一行六列",
          type: "TEXT",
          icon: "el-icon-tickets",
          com: sixText,
        },
        fiveText: {
          name: "一行五列",
          type: "TEXT",
          icon: "el-icon-tickets",
          com: fiveText,
        },
        textArea: {
          name: "文本域",
          type: "TEXT",
          icon: "el-icon-document",
          com: textArea,
        },
        none: {
          name: "空白",
          type: "TEXT",
          icon: "el-icon-folder",
          com: none,
        },
        image: {
          name: "图片",
          type: "IMAGE",
          icon: "el-icon-picture",
          com: image,
        },
        divider: {
          name: "分割线",
          type: "TEXT",
          icon: "el-icon-minus",
          com: Divider,
        },
        code: {
          name: "二维码",
          type: "QRCODE",
          icon: "el-icon-menu",
          com: Code,
        },
        barccc: {
          name: "条形码",
          type: "QRCODE",
          icon: "el-icon-s-data",
          com: barCode,
        },
      },
      view: [
        {
          type: "info",
          title: "",
        },
      ],
      title: "",
      type: "",
      index: null, // 当前组件的索引
      isPush: false, // 是否已添加组件
      props: {}, // 传值
      isRight: false,
      className: {
        1: "one",
        2: "two",
        3: "three",
      },
      dragList: [],
      getDragId: "",
      dragId: window.sessionStorage.getItem("dragId")
        ? window.sessionStorage.getItem("dragId")
        : "PL22090068",
    };
  },
  created() {
    this.loading();
  },
  computed: {
    info() {
      return this.view[0];
    },
  },
  methods: {
    // 提交
    async submit() {
      const form = this.view;

      if (form.length == 1) {
        this.$message.error("请添加模块！");
        return;
      }

      let params = [];
      for (let i of form) {
        if (i.type === "doubletext") {
          for (var j = 0; j < 6; j++) {
            var idx = j === 0 ? "" : j;
            if (i["val" + idx]) {
              var data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + idx],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + idx],
                loopKey: i.loopKey.trim(),
                top: i["top" + idx] === undefined ? "0" : i["top" + idx],
              };
              params.push(data);
            }
          }
        } else if (i.type === "sixText") {
          for (var a = 0; a < 6; a++) {
            var idxa = a === 0 ? "" : a;
            if (i["val" + idxa]) {
              let data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + idxa],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + idxa],
                loopKey: i.loopKey.trim(),
                top: i["top" + idxa] === undefined ? "0" : i["top" + idxa],
              };
              params.push(data);
            }
          }
        } else if (i.type === "fiveText") {
          for (var c = 0; c < 6; c++) {
            var five = c === 0 ? "" : c;
            if (i["val" + five]) {
              let data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + five],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + five],
                loopKey: i.loopKey.trim(),
                top: i["top" + five] === undefined ? "0" : i["top" + five],
              };
              params.push(data);
            }
          }
        } else if (i.type === "image") {
          let dataImage = {
            type: "IMAGE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "TEXT") {
          let dataImage = {
            type: "TEXT",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "divider") {
          let dataImage = {
            type: "TEXTLINE",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "textArea") {
          let dataImage = {
            type: "TEXTAREA",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "none") {
          let dataImage = {
            type: "NONE",
            align: i.align ? i.align : "",
            val: "",
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "barccc") {
          let dataImage = {
            type: "BARCODE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: "80",
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "code") {
          let dataImage = {
            type: "QRCODE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else {
          params.push(i);
        }
      }
      let dragData = params.slice(1);
      let res = await this.$postJson("/YunDian/BillPrint/setBillPrintMould", {
        method: 1,
        content: dragData,
      });
      if (res.success === true) {
        this.$message.success(
          "数据提交成功，请按F12打开控制台查看待提交数据集合！"
        );
      } else {
        this.$message.error("数据修改失败，请检查错误");
      }
      window.sessionStorage.setItem("dragId", res.data);
    },
    buildSubList(item, index, list) {
      let subList = [];
      subList.push(item);
      for (let i = parseInt(index) + 1; i < list.length; i++) {
        let temp = list[i];
        if (temp.loopKey === item.loopKey && temp.top == 0) {
          subList.push(temp);
        } else if (temp.top != 0) {
          return subList;
        }
      }
      return subList;
    },
    // 加载数据
    async loading() {
      if (this.dragId) {
        let res = await this.$postJson("/YunDian/BillPrint/getBillPrintMould", {
          moduleid: this.dragId,
        });
        console.log(res);
        // let res = dragJs

        let dragList = res.data.content;

        let printList = [
          {
            type: "info",
            title: "页面标题",
          },
        ];
        for (const index in dragList) {
          let tempItem = dragList[index];
          if (dragList[index].top != 0) {
            tempItem.subList = this.buildSubList(
              dragList[index],
              index,
              dragList
            );
            if (tempItem.subList.length == 6) {
              tempItem.type = "sixText";
              for (let o = 0; o < tempItem.subList.length; o++) {
                tempItem.subList[o].type = "sixText";
                let idx = o === 0 ? "" : o;
                tempItem["val" + idx] = tempItem.subList[o].val;
                tempItem["left" + idx] = tempItem.subList[o].left;
              }
            } else if (tempItem.subList.length == 2) {
              tempItem.type = "doubletext";
              for (let s = 0; s < tempItem.subList.length; s++) {
                tempItem.subList[s].type = "doubletext";
                let dx = s === 0 ? "" : s;
                tempItem["val" + dx] = tempItem.subList[s].val;
                tempItem["left" + dx] = tempItem.subList[s].left;
              }
            } else if (tempItem.subList.length == 5) {
              tempItem.type = "fiveText";
              for (let s = 0; s < tempItem.subList.length; s++) {
                tempItem.subList[s].type = "fiveText";
                let dx = s === 0 ? "" : s;
                tempItem["val" + dx] = tempItem.subList[s].val;
                tempItem["left" + dx] = tempItem.subList[s].left;
              }
            }
            printList.push(tempItem);
          }
          if (tempItem.type === "IMAGE" || tempItem.type === "image") {
            tempItem.type = "image";
          }
          if (tempItem.type === "QRCODE" || tempItem.type === "code") {
            tempItem.type = "code";
          }
          if (tempItem.type === "BARCODE" || tempItem.type === "barccc") {
            tempItem.type = "barccc";
          }
          if (tempItem.type === "TEXTLINE" || tempItem.type === "divider") {
            tempItem.type = "divider";
          }
          if (tempItem.type === "TEXTAREA" || tempItem.type === "textArea") {
            tempItem.type = "textArea";
          }
          if (tempItem.type === "NONE" || tempItem.type === "none") {
            tempItem.type = "none";
          }
        }
        this.view = printList;
      } else {
        this.view = [];
      }
    },
    // 更新模板
    async changeDrag() {
      const form = this.view;

      let params = [];
      for (let i of form) {
        if (i.type === "doubletext") {
          for (var j = 0; j < 6; j++) {
            var idx = j === 0 ? "" : j;
            if (i["val" + idx]) {
              var data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + idx],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + idx],
                loopKey: i.loopKey.trim(),
                top: i["top" + idx] === undefined ? "0" : i["top" + idx],
              };
              params.push(data);
            }
          }
        } else if (i.type === "sixText") {
          for (var a = 0; a < 6; a++) {
            var idxa = a === 0 ? "" : a;
            if (i["val" + idxa]) {
              let data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + idxa],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + idxa],
                loopKey: i.loopKey.trim(),
                top: i["top" + idxa] === undefined ? "0" : i["top" + idxa],
              };
              params.push(data);
            }
          }
        } else if (i.type === "fiveText") {
          for (var c = 0; c < 6; c++) {
            var five = c === 0 ? "" : c;
            if (i["val" + five]) {
              let data = {
                type: "TEXT",
                align: i.align ? i.align : "left",
                val: i["val" + five],
                width: i.width,
                height: i.height,
                fieldSize: i.fieldSize,
                left: i["left" + five],
                loopKey: i.loopKey.trim(),
                top: i["top" + five] === undefined ? "0" : i["top" + five],
              };
              params.push(data);
            }
          }
        } else if (i.type === "image") {
          let dataImage = {
            type: "IMAGE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "TEXT") {
          let dataImage = {
            type: "TEXT",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "divider") {
          let dataImage = {
            type: "TEXTLINE",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "textArea") {
          let dataImage = {
            type: "TEXTAREA",
            align: i.align ? i.align : "left",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "none") {
          let dataImage = {
            type: "NONE",
            align: i.align ? i.align : "",
            val: "",
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "barccc") {
          let dataImage = {
            type: "BARCODE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: "80",
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else if (i.type === "code") {
          let dataImage = {
            type: "QRCODE",
            align: i.align ? i.align : "center",
            val: i.val,
            width: i.width,
            height: i.height,
            fieldSize: i.fieldSize,
            left: i.left,
            loopKey: i.loopKey.trim(),
            top: i.top,
          };
          params.push(dataImage);
        } else {
          params.push(i);
        }
      }
      let dragData = params.slice(1);
      let res = await this.$postJson("/YunDian/BillPrint/setBillPrintMould", {
        method: 0,
        moduleid: this.dragId,
        content: dragData,
      });
      // console.log(this.dragId,dragData)
      console.log(res);
      if (res.success === true) {
        this.$message.success("数据修改成功");
      } else {
        this.$message.error("数据修改失败，请检查错误");
      }
    },
    // 删除模板
    async editDrag() {
      let res = await this.$postJson("/YunDian/BillPrint/setBillPrintMould", {
        method: -1,
        moduleid: this.dragId,
      });
      console.log(res);
      window.sessionStorage.removeItem("dragId");
      this.noneTemplate();
    },
    defaultOne() {
      this.dragId = "PL22090082";
      this.loading();
    },
    defaultTwo() {
      this.dragId = "PL22090075";
      this.loading();
    },
    defaultThree() {
      this.dragId = "PL22090068";
      this.loading();
    },
    noneTemplate() {
      this.dragId = "";
      this.loading();
    },
    getTemplate() {
      this.dragId = this.getDragId;
      this.loading();
    },
    // 切换视图组件
    selectType(index) {
      this.isRight = false;
      this.props = this.view[index];
      this.$nextTick(() => (this.isRight = true));
    },
    // 删除组件
    deleteItem(e, item, index) {
      e.preventDefault();
      e.stopPropagation();
      this.view.splice(index, 1);
      this.isRight = false;
      this.props = {};
    },
    // 拖拽类型
    dragStart(e) {
      this.type = e.target.dataset.type;
    },
    // 结束拖拽
    dragEnd() {
      this.$delete(this.view[this.index], "status");
      this.isPush = false;
      this.type = null;
    },
    // 已放置到指定位置
    drog(e) {
      if (!this.type) {
        // 内容拖拽
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.dragEnd();
    },
    // 移动中
    dragOver(e) {
      if (!this.type) {
        // 内容拖拽
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      let className = e.target.className;
      let name = className !== "view-content" ? "item" : "view-content";

      var defaultData = {
        type: this.type, // 组件类型
        status: 2, // 默认状态
        align: "",
        width: "",
        height: "",
        top: "40",
        left: "",
        fieldSize: "",
        loopKey: "",
      };
      if (this.type === "textArea") {
        defaultData = {
          type: this.type, // 组件类型
          status: 2, // 默认状态
          align: "",
          width: "",
          height: "",
          val: "亲爱的顾客，感谢您的光临，为保障您的权益，请主动索取并妥善保管本销售凭证。",
          top: "40",
          left: "0",
          fieldSize: "",
          loopKey: "",
        };
      }
      if (this.type === "TEXT") {
        defaultData = {
          type: this.type, // 组件类型
          status: 2, // 默认状态
          align: "",
          width: "",
          height: "",
          val: "val1",
          top: "40",
          left: "0",
          fieldSize: "",
          loopKey: "",
        };
      }
      if (this.type === "doubletext") {
        defaultData = {
          type: this.type, // 组件类型
          status: 2, // 默认状态
          align: "",
          width: "",
          height: "",
          val: "val1",
          val1: "val2",
          top: "40",
          left: "0",
          left1: "300",
          fieldSize: "",
          loopKey: "",
        };
      }
      if (this.type === "fiveText") {
        defaultData = {
          type: this.type, // 组件类型
          status: 2, // 默认状态
          align: "",
          width: "",
          height: "",
          val: "val1",
          val1: "val2",
          val2: "val3",
          val3: "val4",
          val4: "val5",
          top: "40",
          left: "0",
          left1: "120",
          left2: "240",
          left3: "360",
          left4: "480",
          fieldSize: "",
          loopKey: "",
        };
      }
      if (this.type === "sixText") {
        defaultData = {
          type: this.type, // 组件类型
          status: 2, // 默认状态
          align: "",
          width: "",
          height: "",
          val: "val1",
          val1: "val2",
          val2: "val3",
          val3: "val4",
          val4: "val5",
          val5: "val6",
          top: "40",
          left: "0",
          left1: "100",
          left2: "200",
          left3: "300",
          left4: "400",
          left5: "500",
          fieldSize: "",
          loopKey: "",
        };
      }
      if (name == "view-content") {
        if (!this.isPush) {
          this.index = this.view.length;
          this.isPush = true;
          this.view.push(defaultData);
        }
      } else if (name == "item" && e.target.dataset.index != undefined) {
        let target = e.target;
        let [y, h, curIndex] = [
          e.offsetY,
          target.offsetHeight,
          target.dataset.index,
        ];
        let direction = y < h / 2;

        if (!this.isPush) {
          if (direction) {
            if (curIndex == 0) {
              this.view.unshift(defaultData);
            } else {
              this.view.splice(curIndex, 0, defaultData);
            }
          } else {
            curIndex = +curIndex + 1;
            this.view.splice(curIndex, 0, defaultData);
          }
        } else {
          // Moving
          if (direction) {
            var i = curIndex == 0 ? 0 : curIndex - 1;
            var result = this.view[i].status == 2;
          } else {
            // eslint-disable-next-line no-redeclare
            var i = +curIndex + 1;
            // eslint-disable-next-line no-redeclare
            var result = this.view.length > i && this.view[i].status == 2;
          }

          if (result) return;

          const temp = this.view.splice(this.index, 1);
          this.view.splice(curIndex, 0, temp[0]);
        }
        this.index = curIndex;
        this.isPush = true;
      }
    },
    updateDataVal() {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="less" scoped>
#darag {
  display: flex;
  justify-content: space-between;
  margin-top: 30px !important;
  background-color: #fff;
  font-size: 13.5px !important;
}

.left,
.right {
  background: #fff;
  width: 375px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 2px 6px #ccc;
  cursor: move;
  background-color: #fff;

  h4 {
    text-align: center;
    margin: 20px;
  }

  width: 440px;
  background: #fff;
}

.left {
  ul {
    margin: 0;
    padding: 0;

    li {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      list-style: none;
      font-size: 14px;
      color: #666;
      float: left;
      margin: 0 10px;
      border-radius: 6px;
      transition: all 0.3s;
      cursor: move;

      &:hover {
        background: #efefef;
      }

      span {
        display: block;
        font-size: 40px;
        margin-bottom: 8px;
        color: #999;
      }

      p {
        display: block;
        margin: 0;
        font-size: 12px;
      }
    }
  }
}

.main {
  width: 375px;
  max-width: 600px;
  background: #fff;
  position: relative;

  .top-nav {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 999;
    transition: all 0.3s;

    & * {
      pointer-events: none;
    }

    &:hover {
      transform: scale(0.95);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px #afafaf;
    }

    .tit {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }

    img {
      max-width: 100%;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }
  }

  .view-content {
    width: 375px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 2px 6px #ccc;
    cursor: move;
    background-color: #fff;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #dbdbdb;
    }

    &::-webkit-scrollbar-track {
      background: #f6f6f6;
    }

    .item {
      transition: all 0.3s;
      background: #fff;

      &:hover {
        transform: scale(0.95);
        border-radius: 10px;
        box-shadow: 0 0 10px #afafaf;

        .el-icon-error {
          display: block;
        }
      }

      div {
        pointer-events: none;
      }

      .wait {
        background: #deedff;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 12px;
        color: #666;
      }

      .el-icon-error {
        position: absolute;
        right: -10px;
        top: -6px;
        color: red;
        font-size: 25px;
        cursor: pointer;
        display: none;
        z-index: 9999;
      }
    }
  }
}

.right_btn {
  padding: 30px;
  border-bottom: 1px solid red;
}

.tag {
  margin-top: 15px;
  display: flex;
}

.dragIpt {
  margin-top: 15px;
  display: flex;
}
</style>
