<template>
  <div class="app-container">
    <el-button icon="el-icon-upload" type="success" @click="importData()"
      >导入数据</el-button
    >
    <el-button icon="el-icon-download" type="success" @click="exportData()">导出数据</el-button>

    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="数据字典名称" width="180">
      </el-table-column>
      <el-table-column prop="value" label="值" width="180"> </el-table-column>
      <el-table-column prop="dictCode" label="编码"> </el-table-column>
    </el-table>

    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="30%"
      
    >
      <span>
        <!-- 上传 -->
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:9001/admin/cmn/importData"
         
        
          :on-success="successHandler"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="big" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="big"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cmnApi from "@/api/yygh/cmn";
export default {
  data() {
    return {
      dialogVisible: false,
      list: [], //一级数据字典列表
    };
  },
  methods: {
    exportData(){
      location.href='http://localhost:8202/admin/cmn/exportData'
    },
    successHandler(){
        this.dialogVisible=false
        this.getDictList(1)
    },
    submitUpload(){
        this.$refs.upload.submit();
    },
    importData() {
      this.dialogVisible = true;
    },
    getDictList(id) {
      cmnApi.dictList(id).then((resp) => {
        console.log(resp);
        this.list = resp.data.list;
      });
    },
    load(tree, treeNode, resolve) {
      // console.log(tree)
      //根据当前节点查询下级节点
      cmnApi.dictList(tree.id).then((resp) => {
        resolve(resp.data.list);
      });
      resolve();
      setTimeout(() => {
        resolve([]);
      }, 500);
    },
  },
  created() {
    this.getDictList(1);
  },
};
</script>