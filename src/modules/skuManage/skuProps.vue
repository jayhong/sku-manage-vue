<style>
  .m-authsManage-skuProps{
    padding: 20px;
  }
  .m-authsManage-skuProps-header{
    margin-bottom: 20px;
  }
  .m-authsManage-skuProps-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-skuProps-dialog .el-form {
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
  <div class="m-authsManage-skuProps">
    <div class="m-authsManage-skuProps-header">
      <el-button class="add_btn" type="primary" @click="onAddEvent">新增款式</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
      <el-table-column
        prop="sku_prop_id"
        label="ID"
        width="80">
      </el-table-column>
       <el-table-column
        prop="name"
        label="款式名">
      </el-table-column>
      <el-table-column
        prop="image_url"
        label="款式图">
      <template slot-scope="scope">
        <el-popover
        placement="right"
        title=""
        trigger="hover">
        <img :src="scope.row.image_url" style="width: 300px;height: auto;display: block;"/>
        <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url" style="width: 70px;height: auto;display: block;">
      </el-popover>
      </template>
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
    <el-dialog class="m-authsManage-skuProps-dialog" append-to-body :title="isEdit?'编辑款式':'新增款式'" :visible.sync="showEditDialog">
      <el-form :model="item" :rules="rules" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item v-if="isEdit" label="ID">
          <el-input v-model="item.sku_prop_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="item.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="款式图">
            <el-col :span="24">
              <el-upload
                action="/v1/inspect/upload/file"
                list-type="picture"
                :on-change="handleOtherChange"
                :on-preview="handlePreview"
                :before-remove="beforeRemove"
                :file-list="item.image_upload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
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
          {required: true, message: '请输入款式名称', trigger: 'blur'}
        ]
      },
      loading: true,
      showEditDialog: false,
      isEdit: false,
      inputVisible: false,
      inputValue: '',
      sku_prefix: '',
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/skuprops?sku_prefix='+this.sku_prefix,
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
        url: '/v1/inspect/'+ uid +'/skuprops/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增款式成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/skuprops/update',
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
        url: '/v1/inspect/'+ uid +'/skuprops/delete?prop_id='+data,
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        data: data
      }).then(res => {
        this.$message({
          message: '删除款式成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddEvent(){
      this.item = {
        sku_prefix: this.sku_prefix,
        name: '',
        image_url: '',
        image_upload: [],
      };
      this.isEdit = false;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },

    
    onEditEvent(index){
      this.item = {
        index: index,
        sku_prop_id: this.rows[index].sku_prop_id,
        sku_prefix: this.rows[index].sku_prefix,
        name: this.rows[index].name,
        image_url: this.rows[index].image_url,
        image_upload: [],
      };

      this.item.image_upload = [{name: '款式图', url: this.rows[index].image_url}];
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    handleOtherChange(file, fileList){
      this.item.image_upload = fileList;
    },
    handlePreview(file){
      window.open(file.response);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(this.item.name === this.rows[this.item.index].name &&
            this.item.image_url === this.rows[this.item.index].image_url &&
            this.item.image_upload.length === 0){
              this.$message('无任何修改！')
              return false;
            }
            
            if(this.item.image_upload.length !== 0){
              this.item.image_url = this.item.image_upload.map(item => item.response?item.response:item.url)[0];
              console.log(this.item.image_url)
            }

            this.updateItem({
              sku_prop_id: this.item.sku_prop_id,
              sku_prefix: this.item.sku_prefix,
              name: this.item.name,
              image_url: this.item.image_url,                            
            }).then(res => {
              this.showEditDialog = false;
              this.fetchList();
            })
          }else{
            if(this.item.image_upload.length !== 0){
              this.item.image_url = this.item.image_upload.map(item => item.response?item.response:item.url)[0];
              console.log(this.item.image_url)
            }

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
      this.$confirm('本次操作将永久删除该款式, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.rows[index].sku_prop_id)
        this.deleteItem(this.rows[index].sku_prop_id).then(res => {
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

