<template>
  <div :style="{textAlign: align, marginTop:top}" class="barcode">
    <img v-show="!this.val" src="https://pic.imgdb.cn/item/63a2a76bb1fccdcd36667b56.jpg"/>
    <img v-show="this.val" ref="qrCodeDiv" :style="{ height: '80px'}"/>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'

export default {
  data() {
    return {
      list: {},
      qrImg: ''
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
    val: {
      type: String,
    },
  },
  mounted() {
    this.list = this.data
    this.creatQrCode()
  },
  watch: {
    data(newVal) {
      this.list = newVal
    },
    val() {
      this.creatQrCode()
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
    // 标题显示位置
    // eslint-disable-next-line vue/return-in-computed-property
    align() {
      if (this.list.align === "left") {
        return "left";
      } else if (this.list.align === "center") {
        return "center";
      } else if (this.list.align === "right") {
        return "right";
      }
    },
  },
  methods: {
    // 生成二维码
    creatQrCode() {
      JsBarcode(this.$refs.qrCodeDiv, this.list.val, {
        format: "CODE128", // 条形码的格式
        width: 1, // 线宽
        height: 20, // 条码高度
        lineColor: "#000", // 线条颜色
        displayValue: true, // 是否显示文字
        margin: 5, // 设置条形码周围的空白区域
        fontSize: 12, // 设置文本的大小
      });
    },
  }
}
</script>

<style lang="less" scoped>

</style>
