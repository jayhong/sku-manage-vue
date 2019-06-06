<style>
  .m-authsManage-companiesManage-header{
    margin-bottom: 20px;
  }
  .m-authsManage-companiesManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-companiesManage-dialog .el-form {
    padding: 20px;
  }
</style>
<template>
  <div class="m-authsManage-companiesManage">
    <div class="m-authsManage-companiesManage-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增公司</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
      <el-table-column
        v-for="col in cols"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
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
    <el-dialog class="m-authsManage-companiesManage-dialog" append-to-body :title="isEdit?'编辑公司':'新增公司'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.company_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="company_name">
          <el-input v-model="item.company_name" auto-complete="off"></el-input>
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
      cols:[
        {
          prop: 'company_id',
          label: 'ID'
        },{
          prop: 'company_name',
          label: '名称'
        }
      ],
      rows: [],
      item: {},
      rules: {
        company_name:[
          {required: true, message: '请输入公司名称', trigger: 'blur'}
        ]
      },
      loading: true,
      showEditDialog: false,
      isEdit: false
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/company',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET'
      }).then(res => {
        this.rows = res.data;
        this.loading = false;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    addItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/company/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增公司成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/company/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑公司成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/company/del',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除公司成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        company_name: ''
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onEditEvent(index){
      this.item = {
        index: index,
        company_id: this.rows[index].company_id,
        company_name: this.rows[index].company_name
      };
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(this.item.company_name === this.rows[this.item.index].company_name){
              this.$message('无任何修改！')
              return false;
            }
            this.updateItem({
              company_id: this.item.company_id,
              company_name: this.item.company_name
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
      this.$confirm('本次操作将永久删除该公司, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem({company_id: this.rows[index].company_id}).then(res => {
          this.fetchList();
        });
      })
    }
  },
  mounted(){
    this.fetchList();
  }
}
</script>

