<style>
  .m-authsManage-purchaseManage{
    padding: 20px;
  }
  .m-authsManage-purchaseManage-header{
    margin-bottom: 20px;
  }

  .m-authsManage-purchaseManage-dialog .el-input {
    width: 100px;
  }
  .m-authsManage-purchaseManage-dialog .el-form {
    padding: 20px;
  }
  .m-authsManage-purchaseManage-dialog .el-checkbox{
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
  <div class="m-authsManage-purchaseManage">
    <div class="m-authsManage-purchaseManage-form ">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="sku">
              <el-input v-model="form.sku"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="数量">
              <template>
                <el-input-number v-model="form.number" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button  type="primary" @click="onAddSkuEvent">添加</el-button>
              <el-button  @click="onCancelSkuEvent"> 重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>  
    </div>
    <el-table
      v-loading="loading"
      :data="rows"
      stripe
      style="width: 100%">
      <el-table-column label="采购链接"
        min-width="300">
        <template slot-scope="scope" >
          <div v-for="url in scope.row.url" :key="url.index">
          <a :href="url"
            target="url"
            class="buttonText">{{url}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="SKU">
         <template slot-scope="scope">
           <div v-for="item in scope.row.purchase_list" :key="item.index">
             <el-tag>
              {{ item.sku_num }}
            </el-tag> 
           </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="onDetailEvent(scope.$index)"
            type="text">
            详情
          </el-button>
          <el-button
            @click.native.prevent="onEditEvent(scope.$index)"
            type="text">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="m-authsManage-purchaseManage-dialog" append-to-body :title="isEdit?'编辑采购sku':'采购sku详情'" :visible.sync="showEditDialog">
      <el-table 
      v-loading="skuLoading"
      :data="items"
      stripe
      style="width: 100%">
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
        prop="sku_prop_name"
        label="款式名">
      </el-table-column>
      <el-table-column
        prop="size_name"
        label="尺码">
      </el-table-column>
       <el-table-column
        prop="sku"
        label="sku">
      </el-table-column>
      <el-table-column width="300px" label="数量">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.number" class="edit-input" />
            <el-button
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelSkuEdit(scope.row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="isEdit"
        label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            @click="confirmSkuEdit(scope.row)"
          >
            确定
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            @click="scope.row.edit=!scope.row.edit"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="onDelEvent(scope.row)"
            type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { rest } from '@/common/request';

export default {
  data(){
    return {
      rows: [],
      items: [],
      rules: {
        role_name:[
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        department_id:[
          {type: 'number', required: true, message: '请选择所属部门', trigger: 'change'}
        ]
      },
      loading: true,
      skuLoading: true,
      isEdit: false,
      form: {
        sku: '',
        number: 0
      },
      showEditDialog: false,
      isEdit: false,
      order_id: 0
    }
  },
  methods:{
    fetchList(){
      let uid = sessionStorage.getItem('ts_user_id');
      let res = rest({
        url: '/v1/inspect/'+ uid +'/purchase/list?order_id='+this.order_id,
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
    handleChange(value) {
     
    },
    addItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/purchase/add',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增采购sku成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/purchase/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑采购sku成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteItem(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/purchase/delete',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除采购sku成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    onAddSkuEvent(){
      this.form.order_id = this.order_id
      this.addItem({
        sku: this.form.sku,
        number: this.form.number,
        order_id: parseInt(this.order_id),
      }).then(res => {
         this.fetchList(this.order_id)
      })
    },
    onCancelSkuEvent(){
        this.form.sku = '';
        this.form.number = 1;
    },
    onEditEvent(index){
      this.items = this.rows[index].purchase_list.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalNumber = v.number //  will be used when user click the cancel botton
        return v
      })

      this.skuLoading = false
      this.isEdit = true;
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onDetailEvent(index){
      this.items = this.rows[index].purchase_list
      this.isEdit = false;
      this.skuLoading = false
      this.showEditDialog = true;
      this.$refs['itemForm']?this.$refs['itemForm'].clearValidate():null;
    },
    onDelEvent(row){
      this.$confirm('本次操作将永久删除该采购sku, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.items.splice(this.items.indexOf(row), 1);
        this.deleteItem({purchase_id: row.id}).then(res => {
          this.fetchList();
        });
      })
    },
    cancelSkuEdit(row) {
      row.number = row.originalNumber
      row.edit = false
      this.$message({
        message: 'The number has been restored to the original value',
        type: 'warning'
      })
    },
    confirmSkuEdit(row) {
      row.edit = false
      row.originalNumber = row.number
      row.number = parseInt(row.number)
      this.updateItem(row).then(res => {
        this.fetchList();
      })
      this.$message({
        message: 'The number has been edited',
        type: 'success'
      })
    }

  },
  mounted(){
    this.order_id = this.$route.query.order_id
    this.fetchList();
  }
}
</script>

