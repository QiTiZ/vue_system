<template>
  <div :style="{textAlign: align, marginTop:top,lineHeight: height,height: height}" class="img">
    <el-image :src='cc' :style="{ width: width, height: height}">
    </el-image>
  </div>
</template>

<script>

export default {
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
  data() {
    return {
      list: {},
      cc: '',
    };
  },
  created() {
    this.list = this.data;
    this.cc = this.list.val ? this.ImgbaseURL + '/' + this.list.val : 'https://mcs.oneerp.com.cn/_MINIO/hope-bucket/2022/12/22/d7fdb134328646dca83856f403d9d162.jpeg'
  },
  watch: {
    data(newVal) {
      this.list = newVal
    },
    val(newVal) {
      if (newVal) {
        // this.cc = 'https://mcs.oneerp.com.cn/' + '_MINIO/' + newVal
        this.cc = this.ImgbaseURL + '/' + newVal
      } else {
        this.cc = 'https://mcs.oneerp.com.cn/_MINIO/hope-bucket/2022/12/22/d7fdb134328646dca83856f403d9d162.jpeg'
      }
    }
  },
  computed: {
    width() {
      if (this.list.width) {
        return this.list.width / 2 + "px";
      }
    },
    height() {
      if (this.list.height) {
        return this.list.height / 2 + "px";
      }
    },
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
    // 标题显示位置
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

};
</script>

<style lang="less" scoped>
.img {
  width: 375px;
  text-align: center;
}
</style>
