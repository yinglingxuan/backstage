<template>
  <div class="hello">
    <div class="div">
      <div class="title">
        <div style="height: 40px;line-height: 40px;border-bottom:1px solid black">注册</div>
        <div style="margin-top:30px;">
          <el-input v-model="data.shopName"  placeholder="请输入商店名称" class="input"></el-input>
          <el-input v-model="data.shopUserName"  placeholder="请输入用户名" class="input"></el-input>
          <el-input v-model="data.shopPassword"  placeholder="请输入密码" class="input"></el-input>
          <el-button type="success" size="100px" @click="add">注册</el-button>
          <a href="/#/login" style="font-size:10px">返回登录页面</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "index",
      data(){
        return{
         data:{
           shopUserName:"",
           shopPassword:"",
           shopName:''
         }
        }
      },mounted(){

      },methods:{
        add(){
          if(this.data.shopName.length<=0){
            this.err("商家名不能为空");
          }else if(this.data.shopUserName.length<=0){
            this.err("用户名不能为空");
          }else if(this.data.shopPassword.length<=0){
            this.err("密码不能为空");
          }else{
            var _this=this;
            axios.post("http://192.168.2.188:8899/shopRegister",this.data).then(function (data) {
              if(data.data.code=="0000"){
                _this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                });
                window.location.href="/#/login"
              }else if(data.data.code=="0200"){
                _this.err(data.data.msg)
              }else{
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
