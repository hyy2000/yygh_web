<template>
  <div class="app-container">
    <!-- 查询表单 -->
    
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">

      
      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="primary" @click="restData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="hosname" label="医院名称" width="180" />
      <el-table-column prop="hoscode" label="医院编号" width="160" />
      <el-table-column prop="apiUrl" label="地址" width="250" />
      <el-table-column prop="contactsName" label="联系人" />
      <el-table-column prop="contactsPhone" label="联系电话" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/hospitalset/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      style="padding: 30px 0; text-align: center"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import hospset from "@/api/yygh/hospset";
export default {
  data() {
    return {
      restData() {
        this.searchObj = {};
        this.fetchData();
      },
      //查询表单
      // formInline: {
      //   hosname: '',
      //   hoscode: ''
      // },
      listLoading: true,
      list: [],
      total: 0,
      page: 3,
      limit: 5,
      searchObj: {},
    };
  },
  methods: {
    //批量删除
    batchRemove(ids) {
      hospset.removeByIds(ids).then((resp) => {});
    },
    removeDataById(id) {
      this.$confirm("此操作将删除该数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定
          hospset.removeById(id).then((resp) => {
            if (resp.code === 20000) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.fetchData(); //重新加载数据
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.fetchData(this.page);
    },
    fetchData(page = 1) {
      this.page = page;
      hospset
        .getPageList(this.page, this.limit, this.searchObj)
        .then((resp) => {
          // console.log(this.searchObj)
          // console.log(this.searchObj.hosname)
          if (resp.success === true) {
            // console.log(this.page);
            this.list = resp.data.rows;
            this.total = resp.data.total;
          }
          this.listLoading = false;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>