<template>
  <div>
    <div ref="qrCodeUrl" class="img" style="display: none">
    </div>
    <div :style="{textAlign: align, marginTop:top}">
      <img v-show="qrImg"
           :src="qrImg ? qrImg :'https://pic.imgdb.cn/item/639aa76bb1fccdcd3601137b.jpg'"
           :style="{ height: height,width: width}"
      />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

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
    width() {
      if (this.list.fieldSize) {
        return this.list.fieldSize * 2.2 + '%'
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    height() {
      if (this.list.fieldSize) {
        return this.list.fieldSize * 8 + "px";
      }
    },
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
      // eslint-disable-next-line no-unused-vars
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.list.val ? this.list.val : 'https://mp.weixin.qq.com',
        colorDark: '#000000',
        colorLight: '#ffffff',
        width: '100',
        height: '100',
      })

      // width: this.list.width ? this.list.width : '100',
      // height: this.list.height ? this.list.height : '100',
      this.getImg()
    },
    getImg() {
      var canvasData = this.$refs.qrCodeUrl.getElementsByTagName('canvas')
      let imgg = canvasData[canvasData.length - 1].toDataURL("image/jpeg")
      this.qrImg = imgg
    }
  }
}
</script>

<style lang="less" scoped>

</style>
