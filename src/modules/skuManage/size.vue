<style>
  .m-skuManage-size{
    padding: 20px;
  }
  .m-skuManage-size-header{
    margin-bottom: 20px;
  }
  .m-skuManage-size-dialog .el-input {
    width: 300px;
  }
  .m-skuManage-size-dialog .el-form {
    padding: 20px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-sku {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-sku {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<template>
  <div class="m-skuManage-size">
    <div class="m-skuManage-size-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增尺码</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
      <el-table-column
        prop="size_id"
        label="ID"
        width="80">
      </el-table-column>
       <el-table-column
        prop="name"
        label="尺码">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="onEditEvent(scope.$index)"
            type="text">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="onDelEvent(scope.$index)"
            type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="m-skuManage-size-dialog" append-to-body :title="isEdit?'编辑尺码':'新增尺码'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.size_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="item.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="onDialogComfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { rest } from '@/common/request';

export default {
  data(){
    return {
      rows: [],
      item: {
        image_upload: []
      },
      rules: {
        name:[
          {required: true, message: '请输入尺码', trigger: 'blur'}
        ]
      },
      loading: true,
      showEditDialog: false,
      isEdit: false,
      inputVisible: false,
      inputValue: '',
      sku_prefix: 0,
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/size?sku_prefix='+this.sku_prefix,
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET'
      }).then(res => {
        this.rows = res.data;
        this.loading = false;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    addItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/size/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增尺码成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/size/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑尺码成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/size/delete?size_id='+data,
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        data: data
      }).then(res => {
        this.$message({
          message: '删除尺码成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        sku_prefix: parseInt(this.sku_prefix),
        name: '',
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },

    
    onEditEvent(index){
      this.item = {
        index: index,
        size_id: this.rows[index].size_id,
        sku_prefix: this.rows[index].sku_prefix,
        name: this.rows[index].name,
      };

      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },



    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(this.item.name === this.rows[this.item.index].name){
              this.$message('无任何修改！')
              return false;
            }

            this.updateItem({
              size_id: this.item.size_id,
              sku_prefix: this.item.sku_prefix,
              name: this.item.name,                      
            }).then(res => {
              this.showEditDialog = false;
              this.fetchList();
            })
          }else{
            this.addItem(this.item).then(res => {
              this.showEditDialog = false;
              this.fetchList();
            });
          }
        }else{
          return false;
        }
      });
    },
    onDelEvent(index){
      this.$confirm('本次操作将永久删除该尺码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.rows[index])
        this.deleteItem(this.rows[index].size_id).then(res => {
          this.fetchList();
        });
      })
    }
  },
  mounted(){
    this.sku_prefix = this.$route.query.sku_prefix
    this.fetchList();
  }
}
</script>

