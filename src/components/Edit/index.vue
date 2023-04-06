<template>
  <section>
    <component :is="type && list[type]['com']" :data="data" @changeTab="tab" @updateDataVal="updateDataVal"></component>
  </section>
</template>

<script>
import hb_Info from "@/components/Edit/Info";
import hb_Images from "@/components/Edit/Image";
import hb_text from "@/components/Edit/text";
import h_DoubleText from "@/components/Edit/doubleText.vue";
import sixText from "@/components/Edit/sixText.vue";
import hb_divider from "@/components/Edit/divider";
import h_code from "@/components/Edit/code.vue";
import h_barcode from '@/components/Edit/barcode.vue';
import textArea from "@/components/Edit/textArea.vue";
import none from '@/components/Edit/none.vue'
import fiveText from '@/components/Edit/five.vue'

export default {
  name: "EditForm",
  components: {
    hb_Info,
    hb_Images,
    hb_divider,
    hb_text,
    h_DoubleText,
    sixText,
    h_code,
    textArea,
    h_barcode,
    none, fiveText
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
          com: hb_text,
        },
        doubletext: {
          tit: "文本",
          com: h_DoubleText,
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
          com: hb_Info,
        },
        image: {
          tit: "图片",
          com: hb_Images,
        },
        divider: {
          tit: "辅助空白",
          com: hb_divider,
        },
        none: {
          tit: "辅助空白",
          com: none,
        },
        code: {
          tit: "辅助空白",
          com: h_code,
        },
        barccc: {
          tit: "辅助空白",
          com: h_barcode,
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