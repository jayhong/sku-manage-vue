<style>
  .m-skuManage-sku{
    padding: 20px;
  }
  .m-skuManage-sku-header{
    margin-bottom: 20px;
  }
  .m-skuManage-sku-dialog .el-input {
    width: 300px;
  }
  .m-skuManage-sku-dialog .el-form {
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
  <div class="m-skuManage-sku">
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
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
        label="尺码">
        <template slot-scope="scope">
          <el-tag>
            {{ scope.row.size }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="SKU">
         <template slot-scope="scope">
           <div v-for="sku in scope.row.skus" :key="sku.index">
             <el-tag>
              {{ sku }}
            </el-tag>
           </div>
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
    <el-dialog class="m-skuManage-sku-dialog" append-to-body title="编辑款式" :visible.sync="showEditDialog">
      <el-form :model="item" ref="itemForm" label-position="right" label-width="80px">
        <el-form-item label="款式名" prop="name">
          <el-input v-model="item.department" auto-complete="off" disabled ></el-input>
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
                <el-button size="small" type="primary" disabled>点击上传</el-button>
              </el-upload>
            </el-col>
          </el-form-item>
        <el-form-item label="尺码" prop="size">
          <el-input v-model="item.size" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="SKU" >
          <el-tag
            :key="sku"
            v-for="sku in item.skus"
            closable
            :disable-transitions="false"
            @close="handleClose(sku)">
            {{sku}}
          </el-tag>
          <el-input
            class="input-new-sku"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-sku" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">关闭</el-button>
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
      loading: true,
      showEditDialog: false,
      isEdit: false,
      inputVisible: false,
      inputValue: '',
      url_id: 0
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/skus?url_id'+this.url_id,
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST'
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
        url: '/v1/inspect/'+ uid +'/sku/add',
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
        url: '/v1/inspect/'+ uid +'/sku/update',
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
        url: '/v1/inspect/'+ uid +'/sku/delete',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
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

    handleClose(tag) {
      this.item.skus.splice(this.item.skus.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.item.skus.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    
    onEditEvent(index){
      this.item = {
        index: index,
        department_id: this.rows[index].department_id,
        department: this.rows[index].department,
        original_name: this.rows[index].department,
        size: this.rows[index].size,
        original_size: this.rows[index].size,
        image_url: this.rows[index].image_url,
        image_upload: [],
        purchase_url: this.rows[index].purchase_url,
        skus: this.rows[index].skus
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
            if(this.item.department === this.rows[this.item.index].department &&
            this.item.image_url === this.rows[this.item.index].image_url &&
            this.item.skus === this.rows[this.item.index].skus &&
            this.item.purchase_url === this.rows[this.item.index].purchase_url &&
            this.item.image_upload.length === 0){
              this.$message('无任何修改！')
              return false;
            }
            
            if(this.item.image_upload.length !== 0){
              this.item.image_url = this.item.image_upload.map(item => item.response?item.response:item.url)[0];
              console.log(this.item.image_url)
            }

            this.updateItem({
              department_id: this.item.department_id,
              department: this.item.department,
              image_url: this.item.image_url,
              purchase_url: this.item.purchase_url,
              skus: this.item.skus,
              original_name: this.item.original_name,
              size: this.item.size,
              original_size: this.item.original_size,
              name_merge: this.item.name_merge
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
        console.log(this.rows[index].department_id)
        this.deleteItem({department_id: this.rows[index].department_id}).then(res => {
          this.fetchList();
        });
      })
    }
  },
  mounted(){
    this.url_id = this.$route.query.url_id
    this.fetchList();
  }
}
</script>

