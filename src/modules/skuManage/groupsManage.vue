<style>
  .m-authsManage-groupsManage-header{
    margin-bottom: 20px;
  }
  .m-authsManage-groupsManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-groupsManage-dialog .el-form {
    padding: 20px;
  }
</style>
<template>
  <div class="m-authsManage-groupsManage">
    <div class="m-authsManage-groupsManage-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增部门</el-button>
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
    <el-dialog class="m-authsManage-groupsManage-dialog" append-to-body :title="isEdit?'编辑分组':'新增分组'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.group_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="group_name">
          <el-input v-model="item.group_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" prop="company_id">
          <el-select v-model="item.company_id" placeholder="请选择">
            <el-option v-for="company in dict.company" :key="company.company_id" :label="company.company_name" :value="company.company_id"></el-option>
          </el-select>
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
      dict:{},
      cols:[
        {
          prop: 'group_id',
          label: 'ID',
          width: 80
        },{
          prop: 'group_name',
          label: '名称'
        },{
          prop: 'company_name',
          label: '所属公司'
        }
      ],
      rows: [],
      item: {},
      rules: {
        group_name:[
          {required: true, message: '请输入分组名称', trigger: 'blur'}
        ],
        company_id:[
          {type: 'number', required: true, message: '请选择所属公司', trigger: 'change'}
        ]
      },
      loading: true,
      showEditDialog: false,
      isEdit: false
    }
  },
  methods:{
    fetchDict(){
      let uid = sessionStorage.getItem('ts_user_id');
      let res = rest({
        url: '/v1/inspect/'+ uid +'/dict',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET'
      }).then(res => {
        this.dict = res.data;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      let res = rest({
        url: '/v1/inspect/'+ uid +'/group',
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
        url: '/v1/inspect/'+ uid +'/group/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增分组成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/group/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑分组成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/group/del',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除分组成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        group_name: '',
        company_id: null
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onEditEvent(index){
      this.item = {
        index: index,
        group_id: this.rows[index].group_id,
        group_name: this.rows[index].group_name,
        company_id: this.rows[index].company_id
      };
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(this.item.group_name === this.rows[this.item.index].group_name && this.item.company_id === this.rows[this.item.index].company_id){
              this.$message('无任何修改！')
              return false;
            }
            this.updateItem({
              group_id: this.item.group_id,
              group_name: this.item.group_name,
              company_id: this.item.company_id
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
        this.deleteItem({group_id: this.rows[index].group_id}).then(res => {
          this.fetchList();
        });
      })
    }
  },
  mounted(){
    this.fetchDict();
    this.fetchList();
  }
}
</script>

