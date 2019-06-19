<style>
  .m-skuManage-divisionsManage{
    padding: 20px;
  }
  .m-skuManage-divisionsManage-header{
    margin-bottom: 20px;
  }
  .m-skuManage-divisionsManage-dialog .el-input {
    width: 300px;
  }
  .m-skuManage-divisionsManage-dialog .el-form {
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

 .m-skuManage-url-dialog {
   width: 600px;
 }

  .m-skuManage-url-dialog .el-input {
    width: 50px;
  }
  .m-skuManage-url-dialog .el-form {
    padding: 20px;
  }
  .m-skuManage-url-dialog .el-checkbox{
    display: block;
    margin: 0 !important;
  }
  .cancel-btn {
    position: absolute;
    right: 110px;
    top: 18px;
  }
</style>
<template>
  <div class="m-skuManage-divisionsManage">
    <div class="m-skuManage-divisionsManage-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增链接</el-button>
      <el-button class="add_btn" type="primary" @click="onUpdateStatusEvent">检查链接</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
      <el-table-column
        prop="url_id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column label="链接"
        min-width="250">
        <template slot-scope="scope">
          <a :href="scope.row.url"
            target="scope.row.url"
            class="buttonText">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="sku_prefix"
        label="sku前缀">
      </el-table-column>
      <el-table-column
        label="状态"
        width="80">
         <template slot-scope="scope">
          <el-tag :type="scope.row.type">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="label"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="onDownloadEvent(scope.$index)"
            type="text">
            采集
          </el-button>
          <el-button
            @click.native.prevent="onSkuPropEvent(scope.$index)"
            type="text">
            款式
          </el-button>
          <el-button
            @click.native.prevent="onSizeEvent(scope.$index)"
            type="text">
            尺码
          </el-button>
          <el-button
            @click.native.prevent="onSkuEvent(scope.$index)"
            type="text">
            sku
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
    <el-dialog class="m-skuManage-divisionsManage-dialog" append-to-body title="isEdit?'编辑链接':'新增链接'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.url_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="item.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="SKU前缀" prop="sku_prefix">
          <el-input v-model="item.sku_prefix" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="item.status"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="label">
          <el-input v-model="item.label" auto-complete="off"></el-input>
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
      item: {},
      rules: {
        url:[
          {required: true, message: '请输入链接', trigger: 'blur'}
        ],
        sku_prefix:[
          {required: true, message: '请输入SKU前缀', trigger: 'blur'}
        ]
      },
      loading: true,
      skuLoading: true,
      showEditDialog: false,
      showSkuDialog: false,
      isEdit: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/url/list',
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
        url: '/v1/inspect/'+ uid +'/url/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增链接成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/url/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑款式成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/url/delete',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除链接成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },

     updateSkusCollected(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/url/collected/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    
    checkoutUrlStatus(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/url/status',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',      
      }).then(res => {
        this.$message({
          message: '链接状态更新成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        url: '',
        status: true,
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onUpdateStatusEvent(){
      this.loading = true
      this.checkoutUrlStatus().then(res=>{
        this.fetchList();
        this.loading = false
      })
    },
    onEditEvent(index){
      this.item = {
        index: index,
        url_id: this.rows[index].url_id,
        url: this.rows[index].url,
        status: this.rows[index].status,
      };
     
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },

    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(this.item.url === this.rows[this.item.index].url &&
            this.item.status === this.rows[this.item.index].status &&
            this.item.sku_prefix === this.rows[this.item.index].sku_prefix &&
            this.item.label === this.rows[this.item.index].label ){
              this.$message('无任何修改！')
              return false;
            }

            this.updateItem({
              url_id: this.item.url_id,
              url: this.item.url,
              sku_prefix: this.item.sku_prefix,
              label: this.item.label,
              status: this.item.status
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

    onSkuPropEvent(index){
      this.$router.push({ name:'skuProps', query: {sku_prefix: this.rows[index].sku_prefix} });
    },
    onSizeEvent(index){
      this.$router.push({ name:'sizeManage', query: {sku_prefix: this.rows[index].sku_prefix} });
    },
    onSkuEvent(index){
      this.$router.push({ name:'sku', query: {sku_prefix: this.rows[index].sku_prefix} });
    },
    onDelEvent(index){
      this.$confirm('本次操作将永久删除链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem({
          url_id: this.rows[index].url_id,
          sku_prefix: this.rows[index].sku_prefix
        }).then(res => {
          this.fetchList();
        });
      })
    },
    onDownloadEvent(index){
      let uid = sessionStorage.getItem('ts_user_id');
      window.open(`/v1/inspect/${ uid }/url/download?url=`+this.rows[index].url);
    }
  },
  mounted(){
    this.fetchList();
  }
}
</script>

