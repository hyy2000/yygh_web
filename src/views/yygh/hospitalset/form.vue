<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="医院名称">
        <el-input v-model="hospset.hosname"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospset.hoscode"></el-input>
      </el-form-item>
      <el-form-item label="API路径">
        <!-- 平台端调用医院端接口时要使用 -->
        <el-input v-model="hospset.apiUrl"></el-input>
      </el-form-item>
      <el-form-item label="签名key">
        <el-input v-model="hospset.signKey"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="hospset.contactsName"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="hospset.contactsPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
        <el-button :disabled="saveBtnDisabled" type="primary" @click="backList"
          >返回</el-button
        >
        <el-button :disabled="saveBtnDisabled" type="primary" @click="resetForm"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospset from "@/api/yygh/hospset";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      hospset: {},
    };
  },

  methods: {
    //重置表单
    resetForm() {
      this.hospset = {};
    },
    //返回回到列表
    backList() {
      this.$router.push({ path: "/hospitalset/list" });
    },
    //新增和修改
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      //判断操作是修改还是删除
      if (this.hospset.id) {
        this.update();
      } else {
        this.save();
      }
    },
    //添加医院设置
    save() {
      hospset.save(this.hospset).then((resp) => {
        if (resp.code === 20000) {
          this.$message({
            message: "开通成功",
            type: "success",
          });
          //回到列表页面,path写列表页面对应的路由路径
          this.$router.push({ path: "/hospitalset/list" });
        } else {
          this.$message.error("开通失败");
        }
      });
    },
    //修改医院设置
    update() {
      hospset.updateById(this.hospset).then((resp) => {
        if (resp.code === 20000) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push({ path: "/hospitalset/list" });
        } else {
          this.$message.error("修改失败")
        }
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    console.log(id);
    if (id) {
      //id不为空 则是修改
      hospset.getById(id).then((resp) => {
        // console.log(resp)
        this.hospset = resp.data.item;
      });
    }
  },
};
</script>