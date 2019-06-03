<template>
    <div class="login-wrap">
      <!-- <div class="ms-title">提单审核系统</div> -->
      <div class="ms-title"><img src="../assets/logo.png" alt=""></div>
      <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="yzcode" class="yzcode">
            <el-input type="text" placeholder="验证码" v-model="ruleForm.yzcode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            <img @click="refreshYzcode" :src="yzcodeImage"/>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
import { rest } from '../common/request';

export default {
  data: function() {
    const that = this;
    let validateYzcode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        yzcode: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        yzcode:[{ validator: validateYzcode, trigger: 'blur' }]
      },
      yzcodeId: null,
      yzcodeImage: null
    };
  },
  methods: {
    getYZcode(){
      return rest({
        url: '/v1/inspect/get_captcha',
        method: 'GET'
      }).then(res => {
        this.yzcodeId = res.data.captcha_id;
        this.yzcodeImage = res.data.data;
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    postYZcode(data){
      return rest({
        url: '/v1/inspect/verify_captcha',
        method: 'POST',
        data: data
      }).then(res => {
        if(res.data.data === '验证通过'){
          return true;
        }else{
          return false;
        }
      }).catch(res => {
        this.$message.error(res.response.data.msg);
      });
    },
    refreshYzcode(){
      this.getYZcode();
    },
    submitForm() {
      const that = this;
      this.$refs['ruleForm'].validate((valid) => {
        if(valid){
          this.postYZcode({captcha_id: this.yzcodeId, verify_value: this.ruleForm.yzcode}).then(status => {
            if(status){
              let res = rest({
                url: '/v1/inspect/login',
                data: {
                  username: that.ruleForm.username,
                  password: that.ruleForm.password
                },
                method: 'POST'
              }).then(res => {
                sessionStorage.setItem('ts_username',that.ruleForm.username);
                sessionStorage.setItem('ts_user_id',res.data.user_id);
                sessionStorage.setItem('ts_loginState',true);
                sessionStorage.setItem('ts_userToken',res.data.token);
                sessionStorage.setItem('ts_permission',res.data.permission);
                that.$router.push('/index');
              }).catch(res => {
                that.$message.error(res.response.data.msg);
              })
            }else{
              that.$message.error('验证码错误，请重新输入！');
              this.refreshYzcode();
            }
          })
        }
      });
    }
  },
  mounted(){
    this.getYZcode();
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -288px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-title img{
  width: 380px;
  border-radius: 5px;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 222px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.yzcode{

}
.yzcode .el-input{
  width: 49%;
}
.yzcode img{
  width: 49%;
  height: 40px;
  vertical-align: bottom;
  cursor: pointer;
}
</style>