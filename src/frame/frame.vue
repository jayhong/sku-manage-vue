<template>
  <div>
    <el-container>
      <el-header id="frame-header">
        <h1 class="frame-header-name">进货管理系统</h1>
        <div class="frame-header-right">
          <span>欢迎，</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modify">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
      </el-header>
      <el-container :style="{position:'fixed',top:'60px',bottom:'0',width:'100%'}">
        <el-aside id="frame-aside" width="240px">
          <el-menu
          class="frame-aside-menu"
          :default-active="current"
          router>
            <el-menu-item index="/index">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <!-- 去掉权限 -->
            <!-- <el-submenu v-for="aside in asides" v-if="permission.indexOf(aside.path.slice(1)) !== -1" :key="aside.title" :index="aside.path">
              <template slot="title"><i :class="aside.icon"></i>{{ aside.title }}</template>
              <el-menu-item v-for="child in aside.children" v-if="permission.indexOf(child.path.slice(1)) !== -1" :key="child.path" :index="child.path">{{ child.title }}</el-menu-item>
            </el-submenu> -->
            <el-submenu v-for="aside in asides"  :key="aside.title" :index="aside.path">
              <template slot="title"><i :class="aside.icon"></i>{{ aside.title }}</template>
              <el-menu-item v-for="child in aside.children"  :key="child.path" :index="child.path">{{ child.title }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main :style="{background: '#fff'}" class="frame-contain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="showModify" width="500px">
      <el-form :model="modify">
        <el-form-item label="用户帐号">
          <el-input v-model="modify.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input v-model="modify.old_password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="modify.new_password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showModify = false">取消</el-button>
        <el-button type="primary" @click="onPasswordModify">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rest } from '../common/request';

export default {
  name: 'app',
  data () {
    return {
      current: '/',
      asides: [
        {title: 'SKU管理', icon: 'el-icon-setting', path: '/authsManage', children: [
          {title: '链接管理', path: '/authsManage.urlManage'},
          {title: '款式管理', path: '/authsManage.divisionsManage'},
          {title: '进货单管理', path: '/authsManage.rolesManage'},
          {title: '用户管理', path: '/authsManage.usersManage'}
        ]}
      ],
      showModify: false,
      modify: {
        username: sessionStorage.getItem('ts_username'),
        new_password: null,
        old_password: null
      },
      permission: sessionStorage.getItem('ts_permission')
    }
  },
  computed:{
    userName(){
      let username = sessionStorage.getItem('ts_username');
      return username ? username : '未登录';
    }
  },
  watch:{
    '$route.path'(val){
      this.current = val;
    }
  },
  methods:{
   handleCommand(command){
    if(command === 'loginout'){
      sessionStorage.removeItem('ts_username');
      sessionStorage.removeItem('ts_user_id');
      sessionStorage.removeItem('ts_loginState');
      sessionStorage.removeItem('ts_userToken');
      sessionStorage.removeItem('ts_permission');
      this.$router.push('/login');
    }
    if(command === 'modify'){
      this.showModify = true;
    }
   },
   onPasswordModify(){
     let uid = sessionStorage.getItem('ts_user_id');
     let res = rest({
        url: '/v1/inspect/'+ uid +'/password/update',
        headers:{
          'X-Inspect-Token': sessionStorage.getItem('ts_userToken')
        },
        data: this.modify,
        method: 'POST'
     }).then(res => {
        this.$message({
          message: '密码修改成功！',
          type: 'success'
        });
        this.showModify = false;
        this.modify.old_password = null;
        this.modify.new_password = null;
     }).catch(res => {
       this.$message.error(res.response.data.msg);
     })
   }
  },
  mounted(){
    this.current = this.$route.path;
    if(!sessionStorage.getItem('ts_loginState')){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#frame-header{
  color: #fff;
  background-color: #324057;
}
.frame-header-name{
  display: inline-block;
  font-size: 20px;
  line-height: 60px;
}
.frame-header-right{
  float: right;
  font-size: 15px;
  line-height: 60px;
  margin-right: 20px;
}
.el-main{
  padding: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 15px;
}
#frame-aside{
  width: 200px;
  background-color: #fff;
}
.frame-aside-menu{
  height: 100%;
}
#frame-contain{
  margin-left: 10px;
}
</style>
