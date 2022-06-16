<template>
  <div>
    <el-card>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="商品基本信息"></el-step>
        <el-step title="商品库存"></el-step>
        <el-step title="商品描述"></el-step>
      </el-steps>
    </el-card>

    <el-card>
      <div v-show="step === 1">
        <!-- 商品基本信息 -->
        <div class="title">
          基本信息
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品编码">
                <el-input v-model="form.productSn"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>
          <el-form-item label="商品品牌">
            <el-select v-model="form.brandId" placeholder="请选择商品品牌">
              <el-option v-for="item in categoryName" :key="item.id" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" size="mini" class="next" @click="next">下一步,填写库存信息</el-button>
      </div>

      <div v-show="step === 2">
        <!-- 商品基本信息 -->
        <div class="title">
          商品库存信息
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数量">
                <el-input v-model="form.weight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="库存">
                <el-input v-model="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

        <el-button size="mini" class="prev" @click="prev">返回上一步</el-button>
        <el-button type="primary" size="mini" class="next" @click="next">下一步,填写库存信息</el-button>
      </div>

      <div v-show="step === 3">
        <div class="title">详情描述</div>
        <el-divider></el-divider>
        <Tinymce></Tinymce>
        <el-button size="mini" class="prev" @click="prev">返回上一步</el-button>
        <el-button type="primary" size="mini" class="next" @click="addGoods">提交保存</el-button>

      </div>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index.vue'
export default {
  name: '',
  data() {
    return {
      active: 1,
      step: 1,
      form: {
        productSn: '',
        name: '', // 名字
        brandId: '', // 品牌ID
        price: '', // 当前价格
        description: '', // 商品描述
        weight: '', // 商品重量 单位千克
        sort: '' // 库存
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 分类级联选择器
      categoryName: []
    }
  },
  created() {
    this.getCatoryList()
  },
  components: {
    Tinymce
  },
  methods: {
    next() {
      this.step = this.step + 1
      this.active++
    },
    prev() {
      this.step = this.step - 1
      this.active--
    },
    // 获取商品分类
    async getCatoryList() {
      const { data: res } = await this.$http.get('brand/findAllBrand')
      this.categoryName = res.data.items
    },
    async addGoods() {
      var brandName = ''
      this.categoryName.forEach((item) => {
        if (item.id === this.form.brandId) {
          brandName = item.name
        }
      })

      const { data: res } = await this.$http.post('product/addProductAndSkus', {
        pmsSkuStockList: [],
        product: {
          ...this.form,
          brandName
        }
      })

      if (res.code !== 20000) {
        return this.$message.error('添加商品失败')
      }
      this.$message.success('添加商品成功')
      this.$router.push('list')
    }
  }
}
</script>

<style lang='less' scoped>
.el-card {
  position: relative;
  .prev {
    position: relative;
    left: 45%;
    top: 15px;
    transform: translate(-50%, -50%);
  }
  .next {
    position: relative;
    left: 50%;
    top: 15px;
    transform: translate(-50%, -50%);
  }
}
.tinymce-container {
  margin-bottom: 20px;
}
</style>
