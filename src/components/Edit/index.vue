<template>
  <section>
    <component :is="type && list[type]['com']" :data="data" @changeTab="tab" @updateDataVal="updateDataVal"></component>
  </section>
</template>

<script>
import info from "@/components/Edit/Info";
import images from "@/components/Edit/Image";
import text from "@/components/Edit/text";
import doubleText from "@/components/Edit/doubleText.vue";
import sixText from "@/components/Edit/sixText.vue";
import divider from "@/components/Edit/divider";
import code from "@/components/Edit/code.vue";
import barcode from '@/components/Edit/barcode.vue';
import textArea from "@/components/Edit/textArea.vue";
import none from '@/components/Edit/none.vue'
import fiveText from '@/components/Edit/five.vue'

export default {
  name: "EditForm",
  components: {
    info,
    images,
    divider,
    text,
    doubleText,
    sixText,
    code,
    textArea,
    barcode,
    none,
    fiveText
  },
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      type: "",
      list: {
        TEXT: {
          tit: "文本",
          com: text,
        },
        doubletext: {
          tit: "文本",
          com: doubleText,
        },
        textArea: {
          tit: "文本",
          com: textArea,
        },
        sixText: {
          tit: "文本",
          com: sixText,
        },
        fiveText: {
          tit: "文本",
          com: fiveText,
        },
        info: {
          tit: "页面信息",
          com: info,
        },
        image: {
          tit: "图片",
          com: images,
        },
        divider: {
          tit: "辅助空白",
          com: divider,
        },
        none: {
          tit: "辅助空白",
          com: none,
        },
        code: {
          tit: "辅助空白",
          com: code,
        },
        barccc: {
          tit: "辅助空白",
          com: barcode,
        },
      },
      tabType: {
        1: true,
        2: false,
        3: false,
      },
    };
  },
  mounted() {
    this.type = this.data.type;
    if (this.data.tabType) {
      this.tab(this.data.tabType);
    }
  },
  methods: {
    tab(key) {
      for (let i in this.tabType) {
        if (key == i) {
          this.tabType[key] = true;
          this.$set(this.data, "tabType", key);
        } else {
          this.tabType[i] = false;
        }
      }
    },
    updateDataVal(val) {
      this.data = val
      this.$forceUpdate()
      this.$emit('updateDataVal', val)
    },
  },
};
</script>

<style lang="less" scoped>
section {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
}
</style>
