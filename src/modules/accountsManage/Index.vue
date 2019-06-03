<template>
  <div class="m-accountsManage">
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="user_id"
        label="用户id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="real_name"
        label="真实姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="company_name"
        label="公司"
        width="150">
      </el-table-column>
      <el-table-column
        prop="group_name"
        label="组别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, list)"
            type="text">
            编辑
          </el-button>
          <!-- <el-button
            @click.native.prevent="submitRow(scope.$index, list)"
            type="text">
            确定
          </el-button> -->
          <el-button
            @click.native.prevent="deleteRow(scope.$index, list)"
            type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      editing: false,
      list: [
        {
          user_id: 1,
          created_at: '2017-11-11 8:30:50',
          username: 'bilibili',
          password: '123456',
          real_name: '张三',
          company_name: '无限公司',
          group_name: '第三小组',
          role_name: '普通派单员'
        },
        {
          user_id: 2,
          created_at: '2017-11-11 8:30:50',
          username: 'bilibili',
          password: '123456',
          real_name: '李四',
          company_name: '有限公司',
          group_name: '第一小组',
          role_name: '高级派单员'
        },
        {
          user_id: 3,
          created_at: '2017-11-11 8:30:50',
          username: 'bilibili',
          password: '123456',
          real_name: '王五',
          company_name: '无限有限公司',
          group_name: '第二小组',
          role_name: '超级管理员'
        }
      ]
    }
  },
  methods:{
    editRow(index, list){
      if(this.editing){
       return 
      }
      this.editing = true;
    },
    submitRow(index, list){
      this.editing = false;
    },
    deleteRow(index, list){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style scoped>
</style>
