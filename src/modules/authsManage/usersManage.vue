<style>
  .m-authsManage-userManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-userManage-dialog .el-form {
    padding: 20px;
  }
  .m-authsManage-userManage-header{
    margin-bottom: 20px;
    /* min-width: 1000px; */
  }
  .m-authsManage-userManage-header .add_btn{
    /* float: right; */
  }
  .m-authsManage-tree{
    padding: 20px 10px;
    margin: 0 5px;
  }
  .m-authsManage-userManage{
    border-left: 1px #ddd solid;
    padding: 20px;
    height: 100%;
  }
  .m-authsManage-companiesManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-companiesManage-dialog .el-form {
    padding: 20px;
  }
  .m-authsManage-groupsManage-dialog .el-input {
    width: 300px;
  }
  .m-authsManage-groupsManage-dialog .el-form {
    padding: 20px;
  }
</style>

<template>
  <div :style="{height: '100%'}">
    <el-row :style="{height: '100%'}">
      <el-col :style="{height: '100%'}" :span="5">
        <div class="m-authsManage-tree">
          <el-input
            :style="{marginBottom: '10px'}"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div style="text-align: center;margin-bottom:20px;">
            <el-button-group>
              <el-button plain size="mini" icon="el-icon-plus" @click="onCompanyAddEvent">新增公司</el-button>
              <el-button plain size="mini" icon="el-icon-plus" @click="onGroupAddEvent">新增分组</el-button>
            </el-button-group>
          </div>
          <el-tree 
            :data="userTree" 
            :props="defaultProps" 
            :highlight-current="true" 
            :indent="8"
            :filter-node-method="filterNode"
            ref="tree"
            :render-content="renderContent"
            :default-expand-all="true"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"/>
        </div>
      </el-col>
      <el-col :style="{height: '100%'}" :span="19">
        <div class="m-authsManage-userManage">
          <div class="m-authsManage-userManage-header">
            <el-button class="add_btn" size="medium" type="primary" @click="onUserAddEvent">新增用户</el-button>
            <el-input
              :style="{width:'256px'}"
              placeholder="输入用户名进行过滤"
              v-model="filterUsername">
            </el-input>
          </div>
          <el-table
            v-loading="loading"
            :data="rowWithFilter"
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
              prop="created_at"
              label="创建时间"
              width="160">
              <template slot-scope="scope">
                {{ scope.row.created_at | dateFormat('yyyy-MM-dd HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="last_time"
              label="最近登录时间"
              width="160">
              <template slot-scope="scope">
                {{ scope.row.last_time | dateFormat('yyyy-MM-dd HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="enable"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.enable === 1 ? 'success' : 'danger'"
                  close-transition>{{scope.row.enable === 1 ? '启用中' : '禁用中'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="onUserEditEvent(scope.$index)"
                  type="text">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="onChangeUserState(scope.$index)"
                  type="text">
                  {{ scope.row.enable === 1 ? '禁用' : '启用'}}
                </el-button>
                <el-button
                  @click.native.prevent="onUserDelEvent(scope.$index)"
                  type="text">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog class="m-authsManage-userManage-dialog" append-to-body :title="isEdit?'编辑用户':'新增用户'" :visible.sync="showEditDialog" width="900px">
            <el-form :inline="true" :model="item" label-position="right" :rules="rules" ref="itemForm" label-width="80px">
              <el-form-item label="ID" v-if="isEdit">
                <el-input v-model="item.id" auto-complete="off" :disabled="isEdit" />
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="item.username" auto-complete="off" />
              </el-form-item>
              <br>
              <el-form-item label="密码" prop="password" v-if="!isEdit">
                <el-input v-model="item.password" type="password" auto-complete="off" />
              </el-form-item>
              <br>
              <el-form-item label="确认密码" prop="password_again" v-if="!isEdit">
                <el-input v-model="item.password_again" type="password" auto-complete="off" />
              </el-form-item>
              <br v-if="!isEdit">
              <el-form-item label="所属公司" prop="company_id">
                <el-select v-model="item.company_id" placeholder="请选择">
                  <el-option v-for="item in dict.company" :key="item.company_id" :label="item.company_name" :value="item.company_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属分组" prop="group_id">
                <el-select v-model="item.group_id" placeholder="请选择">
                  <el-option v-for="item in item_groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="所属部门" prop="department_id">
                <el-select v-model="item.department_id" placeholder="请选择">
                  <el-option v-for="item in dict.department" :key="item.company_id" :label="item.department" :value="item.department_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色" prop="role_id">
                <el-select v-model="item.role_id" placeholder="请选择">
                  <el-option v-for="item in dict.role" :key="item.role_id" :label="item.role_name" :value="item.role_id"></el-option>
                </el-select>
              </el-form-item>
              <br>
              <el-form-item label="描述">
                <el-input :style="{width: '300px'}" v-model="item.descript" type="textarea" placeholder="请输入描述" :rows="4" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showEditDialog = false">取 消</el-button>
              <el-button type="primary" @click="onUserDialogComfirm">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog class="m-authsManage-companiesManage-dialog" append-to-body :title="isCompanyEdit?'编辑公司':'新增公司'" :visible.sync="showCompanyEditDialog">
            <el-form :model="companyItem" :rules="companyRules" ref="companyForm" label-position="right" label-width="80px">
              <el-form-item v-if="isCompanyEdit" label="ID">
                <el-input v-model="companyItem.company_id" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="company_name">
                <el-input v-model="companyItem.company_name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showCompanyEditDialog = false">取 消</el-button>
              <el-button type="primary" @click="onCompanyDialogComfirm">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog class="m-authsManage-groupsManage-dialog" append-to-body :title="isGroupEdit?'编辑分组':'新增分组'" :visible.sync="showGroupEditDialog">
            <el-form :model="groupItem" :rules="groupRules" ref="groupForm" label-position="right" label-width="80px">
              <el-form-item v-if="isGroupEdit" label="ID">
                <el-input v-model="groupItem.group_id" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="group_name">
                <el-input v-model="groupItem.group_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属公司" prop="company_id">
                <el-select v-model="groupItem.company_id" placeholder="请选择">
                  <el-option v-for="company in dict.company" :key="company.company_id" :label="company.company_name" :value="company.company_id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showGroupEditDialog = false">取 消</el-button>
              <el-button type="primary" @click="onGroupDialogComfirm">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { rest } from '@/common/request';

export default {
  data(){
    let validatePasswordAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.item.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dict:{},
      cols:[
        {
          prop: 'id',
          label: 'ID',
          width: 80
        },{
          prop: 'username',
          label: '用户名'
        },{
          prop: 'company_name',
          label: '所属公司'
        },{
          prop: 'department_name',
          label: '部门'
        },{
          prop: 'group_name',
          label: '组别'
        },{
          prop: 'role_name',
          label: '角色'
        }
      ],
      rows: [],
      item: {},
      item_groups: [],
      item_roles: [],
      rules: {
        username:[
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        password_again:[
          {validator: validatePasswordAgain, trigger: 'blur'}
        ],
        company_id:[
          {type: 'number', required: true, message: '请选择所属公司', trigger: 'change'}
        ],
        group_id:[
          {type: 'number', required: true, message: '请选择分组', trigger: 'change'}
        ],
        department_id:[
          {type: 'number', required: true, message: '请选择所属部门', trigger: 'change'}
        ],
        role_id:[
          {type: 'number', required: true, message: '请选择角色', trigger: 'change'}
        ]
      },
      loading: true,
      showEditDialog: false,
      isEdit: false,
      searchKeyword: '',

      userTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      filterUsername: '',

      companyItem: {},
      companyRules: {
        company_name:[
          {required: true, message: '请输入公司名称', trigger: 'blur'}
        ]
      },
      showCompanyEditDialog: false,
      isCompanyEdit: false,

      groupItem: {},
      groupRules: {
        group_name:[
          {required: true, message: '请输入分组名称', trigger: 'blur'}
        ],
        company_id:[
          {type: 'number', required: true, message: '请选择所属公司', trigger: 'change'}
        ]
      },
      showGroupEditDialog: false,
      isGroupEdit: false,
    }
  },
  watch:{
    'item.company_id'(val){
      if(val){
        this.fetchGroups(val);
      }
    },
    // 'item.department_id'(val){
    //   if(val){
    //     this.fetchRoles(val);
    //   }
    // },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed:{
    'rowWithFilter'(){
      if(this.filterUsername !== ''){
        return this.rows.filter(item => item.username.includes(this.filterUsername));
      }else{
        return this.rows;
      }
    }
  },
  methods:{
    /**
     * UserTree Actions
     */
    handleNodeClick(data, node) {
      switch(node.level){
        case 1:this.loading=true;this.fetchUserList();break;
        case 2:this.loading=true;this.fetchUserList({company_id: data.id});break;
        case 3:this.loading=true;this.fetchUserList({group_id: data.id});break;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    renderContent(h, {node, data, store}){
      if(node.level === 1){
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
          </span>
        );
      }else{
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <a style="color:#409EFF" href="javascript:void(0)" on-click={ () => this.tree_edit(node, data) }><i size="mini" class="el-icon-edit"></i></a>
              <a style="color:#409EFF;margin-left:10px" href="javascript:void(0)" on-click={ () => this.tree_remove(node, data) }><i size="mini" class="el-icon-delete"></i></a>
            </span>
          </span>
        );
      }
    },
    tree_edit(node, data) {
      window.event.stopPropagation();
      switch(node.level){
        case 2:;this.editCompany(data.id);break;
        case 3:;this.editGroup(data.id);break;
      }
    },
    tree_remove(node, data) {
      window.event.stopPropagation();
      if(node.level === 2){
        this.removeCompany(data.id);
      }else if(node.level === 3){
        this.removeGroup(data.id);
      }
    },
    removeCompany(id){
      this.$confirm('本次操作将永久删除该公司, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCompany({company_id: id}).then(res => {
          this.fetchUserTree();
          this.fetchDict();
        });
      }).catch(() => {});
    },
    removeGroup(id){
      this.$confirm('本次操作将永久删除该分组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteGroup({group_id: id}).then(res => {
          this.fetchUserTree();
          this.fetchDict();
        });
      }).catch(() => {});
    },
    editCompany(id){
      this.getCompany({company_id: id}).then(res => {
        this.companyItem = res.data[0];
        this.isCompanyEdit = true;
        this.showCompanyEditDialog = true;
      })
    },
    onCompanyDialogComfirm(){
      this.$refs['companyForm'].validate((valid) => {
        if(valid){
          if(this.isCompanyEdit){
            this.updateCompany({
              company_id: this.companyItem.company_id,
              company_name: this.companyItem.company_name
            }).then(res => {
              this.showCompanyEditDialog = false;
              this.fetchUserTree();
              this.fetchDict();
            })
          }else{
            this.addCompany(this.companyItem).then(res => {
              this.showCompanyEditDialog = false;
              this.fetchUserTree();
              this.fetchDict();
            });
          }
        }else{
          return false;
        }
      });
    },
    editGroup(id){
       this.getGroup({group_id: id}).then(res => {
        this.groupItem = res.data[0];
        this.isGroupEdit = true;
        this.showGroupEditDialog = true;
      })
    },
    onGroupDialogComfirm(){
      this.$refs['groupForm'].validate((valid) => {
        if(valid){
          if(this.isGroupEdit){
            this.updateGroup({
              group_id: this.groupItem.group_id,
              group_name: this.groupItem.group_name,
              company_id: this.groupItem.company_id
            }).then(res => {
              this.showGroupEditDialog = false;
              this.fetchUserTree();
              this.fetchDict();
            })
          }else{
            this.addGroup(this.groupItem).then(res => {
              this.showGroupEditDialog = false;
              this.fetchUserTree();
              this.fetchDict();
            });
          }
        }else{
          return false;
        }
      });
    },
    onCompanyAddEvent(){
      this.companyItem = {
        company_name: ''
      };
      this.isCompanyEdit = false;
      this.showCompanyEditDialog = true;
      this.$refs['companyForm']?this.$refs['companyForm'].clearValidate():null;
    },
    onGroupAddEvent(){
      this.groupItem = {
        group_name: '',
        company_id: null
      };
      this.isGroupEdit = false;
      this.showGroupEditDialog = true;
      this.$refs['groupForm']?this.$refs['groupForm'].clearValidate():null;
    },
    /**
     * User Actions
     */
    onUserAddEvent(){
      this.isEdit = false;
      this.item_groups = [],
      this.item_roles = [],
      this.item = {
        username: '',
        password: '',
        password_again: '',
        company_id: null,
        group_id: null,
        role_id: null,
        department_id: null,
        descript: '',
        enable: 1
      }
      this.showEditDialog = true;
    },
    onUserEditEvent(index){
      this.item = {
        index: index,
        id: this.rows[index].id,
        username: this.rows[index].username,
        company_id: this.rows[index].company_id,
        group_id: this.rows[index].group_id,
        role_id: this.rows[index].role_id,
        department_id: this.rows[index].department_id,
        descript: this.rows[index].descript
      };
      this.isEdit = true;
      this.showEditDialog = true;
    },
    onUserDialogComfirm(){
      this.$refs['itemForm'].validate((valid) => {
        if(valid){
          if(this.isEdit){
            if(
                this.item.username === this.rows[this.item.index].username 
                && this.item.company_id === this.rows[this.item.index].company_id
                && this.item.group_id === this.rows[this.item.index].group_id
                && this.item.role_id === this.rows[this.item.index].role_id
                && this.item.department_id === this.rows[this.item.index].department_id
                && this.item.descript === this.rows[this.item.index].descript
              ){
              this.$message('无任何修改！')
              return false;
            }
            this.updateUser({
              user_id: this.item.id,
              username: this.item.username,
              company_id: this.item.company_id,
              group_id: this.item.group_id,
              role_id: this.item.role_id,
              department_id: this.item.department_id,
              descript: this.item.descript
            }).then(res => {
              this.showEditDialog = false;
              this.fetchList();
            })
          }else{
            this.addUser(this.item).then(res => {
              this.showEditDialog = false;
              this.fetchList();
            });
          }
        }else{
          return false;
        }
      });
    },
    onChangeUserState(index){
      let todoName = this.rows[index].enable === 1?'禁用':'启用';
      let todoStatus = this.rows[index].enable === 1?-1:1;

      this.$confirm('本次操作将'+ todoName +'该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateUser({user_id: this.rows[index].id, enable: todoStatus})
        .then(res => {
          this.fetchList();
        });
      })
    },
    onUserDelEvent(index){
      this.$confirm('本次操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser({user_id: this.rows[index].id})
        .then(res => {
          this.fetchList();
        });
      })
    },
    /**
     * Apis
     */
    fetchDict(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
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
    fetchUserTree(){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/tree',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET'
      }).then(res => {
        let data = [
          {
            id: 0,
            label: '全部用户',
            children: res.data.userTree
          }
        ]
        this.userTree = data;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    fetchUserList(params){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/user/list',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        params: params
      }).then(res => {
        this.rows = res.data;
        this.loading = false;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    fetchGroups(company_id){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/group/list',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        params: {
          company_id: company_id
        }
      }).then(res => {
        this.item_groups = res.data;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    fetchRoles(department_id){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/role/list',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        params: {
          department_id: department_id
        }
      }).then(res => {
        this.item_roles = res.data;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    addUser(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/user/create',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '新增用户成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateUser(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/user/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '编辑用户成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteUser(data){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/user/delete',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'POST',
        data: data
      }).then(res => {
        this.$message({
          message: '删除用户成功，请在列表中查看！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    getCompany(params){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/company',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        params: params
      }).then(res => {
        return res;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    getGroup(params){
      let uid = sessionStorage.getItem('ts_user_id');
      return rest({
        url: '/v1/inspect/'+ uid +'/group',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        method: 'GET',
        params: params
      }).then(res => {
        return res;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    updateCompany(data){
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
          message: '编辑公司成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    updateGroup(data){
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
          message: '编辑分组成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    addCompany(data){
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
          message: '新增公司成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    addGroup(data){
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
          message: '新增分组成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteCompany(data){
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
          message: '删除公司成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
    deleteGroup(data){
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
          message: '删除分组成功！',
          type: 'success'
        });
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      })
    },
  },
  mounted(){
    this.fetchUserList();
    this.fetchDict();
    this.fetchUserTree();
  }
}
</script>

