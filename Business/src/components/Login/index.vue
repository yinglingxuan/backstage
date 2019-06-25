<template>
  <div class="hello">
    <div class="div">
      <div class="title">
        <div style="height: 40px;line-height: 40px;border-bottom:1px solid black">欢迎登录</div>
        <div style="margin-top:30px;">
          <el-input v-model="data.shopUserName"  placeholder="请输入用户名" class="input"></el-input>
          <el-input v-model="data.shopPassword"  placeholder="请输入密码" class="input"></el-input>
          <el-button type="success" size="100px" @click="login">登录</el-button>
          <a href="/#/register" style="font-size: 12px">没有账号？ 点击注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      data:{
        shopUserName:"",
        shopPassword:""
      }
    }
  },methods:{
    login(){
      var storage=window.localStorage; //获取对象

     if(this.data.shopUserName.length<=0){
        this.err("用户名不能为空");
      }else if(this.data.shopPassword.length<=0){
        this.err("密码不能为空");
      }else {
       var _this = this;
       axios.post("http://192.168.2.133:8899/shopEntry", this.data).then(function (data) {
         if (data.data.code == "0000") {
           _this.$message({
             message: '登录成功',
             type: 'success'
           });
           storage.setItem("data",data.data.data);
           console.info(data);
           window.location.href = "/#/home"

         } else if (data.data.code == "0200") {
           _this.err(data.data.msg)
         } else {
           console.log(data);
           _this.err(data.data.msg)
         }
       })
     }
    },err(text){
      this.$message({
        message: text,
        type: 'warning'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div{
    margin: 100px auto;
    width: 30%;
    text-align: center;
    min-width: 300px;

  }
  .div .input{
    height: 50px;
  }
  .title{
    padding: 10px 15px ;
    border:1px solid rgba(7,17,27,0.1);
    background:white;
  }

</style>
