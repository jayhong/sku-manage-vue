<style>
  .m-authsManage-orderManage{
    padding: 20px;
  }
  .m-authsManage-orderManage-header{
    margin-bottom: 20px;
  }
  .m-authsManage-orderManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-orderManage-dialog .el-form {
    padding: 20px;
  }
  .m-authsManage-orderManage-dialog .el-checkbox{
    display: block;
    margin: 0 !important;
  }
</style>
<template>
  <div class="m-authsManage-orderManage">
    <div class="m-authsManage-orderManage-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增进货单</el-button>
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
            @click.native.prevent="onDetailEvent(scope.$index)"
            type="text">
            SKU列表
          </el-button>
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
    <el-dialog class="m-authsManage-orderManage-dialog" append-to-body :title="isEdit?'编辑采购单':'新增采购单'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.order_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="order_name">
          <el-input v-model="item.order_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input :style="{width: '300px'}" v-model="item.descript" type="textarea" placeholder="请输入描述" :rows="4" />
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
          prop: 'order_id',
          label: 'ID',
          width: 80
        },{
          prop: 'order_name',
          label: '名称'
        },
        {
          prop: 'sku_count',
          label: 'sku数量'
        },
        {
          prop: 'total',
          label: '采购总数'
        },
        {
          prop: 'create_at',
          label: '创建时间'
        },
        {
          prop: 'descript',
          label: '描述'
        }
      ],
      rows: [],
      item: {},
      rules: {
        order_name:[
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
      },
      loading: true,
      showEditDialog: false,
      isEdit: false
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      let res = rest({
        url: '/v1/inspect/'+ uid +'/order',
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
        url: '/v1/inspect/'+ uid +'/order/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增采购单成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/order/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑采购单成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/order/delete',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除采购单成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        order_name: '',
        descript: ''
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onEditEvent(index){
      this.item = {
        index: index,
        order_id: this.rows[index].order_id,
        order_name: this.rows[index].order_name,
        descript: this.rows[index].descript
      };
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onDetailEvent(index){
      this.$router.push({ name:'purchaseManage', query: {order_id: this.rows[index].order_id} });
    },
    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            // if(this.item.order_name === this.rows[this.item.index].order_name){
            //   this.$message('无任何修改！')
            //   return false;
            // }
            this.updateItem({
              order_id: this.item.order_id,
              order_name: this.item.order_name,
              descript: this.item.descript
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
      this.$confirm('本次操作将永久删除该采购单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem({order_id: this.rows[index].order_id}).then(res => {
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

