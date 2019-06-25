<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo">后台管理</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <!--<ul class="layui-nav layui-layout-left">

        <li class="layui-nav-item">
          <a href="javascript:;">其它系统</a>
          <dl class="layui-nav-child">
            <dd><a href="javascript:;">邮件管理</a></dd>
            <dd><a href="javascript:;">消息管理</a></dd>
            <dd><a href="javascript:;">授权管理</a></dd>
          </dl>
        </li>
      </ul>-->
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img :src="UserDate==''?'http://t.cn/RCzsdCq':UserDate.shopIcon" class="layui-nav-img">
            {{UserDate.shopName}}
          </a>
          <dl class="layui-nav-child">
            <dd><a href="javascript:;">基本资料</a></dd>
            <dd><a href="javascript:;">安全设置</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item" @click="exits">退出</li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree"  lay-filter="test">
          <li class="layui-nav-item layui-nav-itemed">
            <a class="" href="javascript:;">商品管理</a>
            <dl class="layui-nav-child">
              <dd class=""><router-link :to="{path:'/home'}">类型管理</router-link></dd>
              <dd class="layui-bg-green"><a href="javascript:;">商品管理</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:;">订单管理</a>
            <dl class="layui-nav-child">
              <dd><router-link :to="{path:'/order'}">订单列表</router-link></dd>
            </dl>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:;">商家管理</a>
            <dl class="layui-nav-child">
              <router-link :to="{path:'/users'}">商家信息</router-link>
            </dl>
          </li>
          <!--<li class="layui-nav-item"><a href="javascript:;">云市场</a></li>
          <li class="layui-nav-item"><a href="javascript:;">发布商品</a></li>-->
        </ul>
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <div style="padding: 15px;">
          <goods></goods>
      </div>
    </div>

    <div class="layui-footer">
      <!-- 底部固定区域 -->
      <!-- © layui.com - 底部固定区域-->

    </div>
  </div>
    
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import axios from 'axios'
    import goods from './GoodsMappas'
    export default {
        name: "MerchantType",

        mounted(){
          layui.use('element', function(){
            var element = layui.element;
            element.render('nav');
          });

        },
        components:{
          goods
        },
      computed:{
        ...mapGetters({
          UserDate:'UserDate'
        })
      },
      methods:{
        exits(){
          var storage=window.localStorage; //获取对象
          storage.removeItem("data");
          this.$store.state.UserDate='';
        }
      },
      created(){
        var storage=window.localStorage; //获取对象
        var uuid=storage.getItem("data");
        if(uuid==null||uuid==''){
          this.as=false;
          this.$message({
            message: '登录失效，请重新登录',
            type: 'success'
          });
          window.location.href = "/#/login"
          return;
        }
        axios.get("http://192.168.2.133:8899/getShopMessage?uuid="+uuid+"").then(res => {
          let data = res.data;
          if (data.code === '0000'){
            this.$store.state.UserDate=data.data;
          } else{
            alert(data.msg)
          }
        }).catch(reason => {
          console.error(reason)
        }).finally(()=> {
          console.log(arguments)
        })
      },
    }
</script>

<style scoped>

</style>
