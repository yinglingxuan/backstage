<template>
  <div class="layui-layout layui-layout-admin"   >
    <div class="layui-header">
      <div class="layui-logo">后台管理</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
     <!-- <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item"><a href="">控制台</a></li>
        <li class="layui-nav-item"><a href="">商品管理</a></li>
        <li class="layui-nav-item"><a href="">用户</a></li>
        <li class="layui-nav-item">
          <a href="javascript:;">其它系统</a>
          <dl class="layui-nav-child">
            <dd><a href="">邮件管理</a></dd>
            <dd><a href="">消息管理</a></dd>
            <dd><a href="">授权管理</a></dd>
          </dl>
        </li>
      </ul>-->
      <ul class="layui-nav layui-layout-right" >
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img :src="UserDate==''?'http://t.cn/RCzsdCq':UserDate.shopIcon" class="layui-nav-img">
            {{UserDate.shopName}}
          </a>
          <dl class="layui-nav-child">
            <dd @click="personal"><a href="javascript:;">基本资料</a></dd>
            <dd @click="safety"><a href="javascript:;">安全设置</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item" @click="exits">退出</li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black" >
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree"  lay-filter="test">
          <li class="layui-nav-item layui-nav-itemed">
            <a class="" href="javascript:;"   >商品管理</a>
            <dl class="layui-nav-child" >
              <dd class="layui-bg-green"><a href="javascript:;"  data-options="{url:'/types',title:'类型管理',id:1}">类型管理</a></dd>
              <!--<dd><a href="javascript:;">商品管理</a></dd>-->
              <dd class=""><a href="javascript:;"  data-options="{url:'/goods',title:'商品管理',id:2}">商品管理</a></dd>
              <!--<dd><router-link :to="{path:'/goods'}">商品管理</router-link></dd>-->
            </dl>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:;">订单管理</a>
            <dl class="layui-nav-child">
              <dd class=""><a href="javascript:;" data-options="{url:'/order',title:'订单管理',id:3}">订单管理</a></dd>
              <!--<router-link :to="{path:'/order'}">订单列表</router-link>-->
            </dl>
          </li>

          <li class="layui-nav-item">
            <a href="javascript:;">商家管理</a>
            <dl class="layui-nav-child">
              <!--<router-link :to="{path:'/users'}">商家信息</router-link>-->
              <dd class=""><a href="javascript:;" data-options="{url:'/users',title:'商家管理',id:4}">商家管理</a></dd>
            </dl>
          </li>

         <!-- <li class="layui-nav-item"><a href="javascript:;">云市场</a></li>
          <li class="layui-nav-item"><a href="javascript:;">发布商品</a></li>-->
        </ul>
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <div style="padding: 5px; padding-top: 0px"  class="layui-tab" lay-filter="tabs" lay-allowclose="true">
          <!--<types></types>-->


        <div class="layui-tab" lay-filter="demo" lay-allowclose="true">
          <ul class="layui-tab-title">
            <li lay-id="1">类型管理</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <iframe scrolling="auto" frameborder="0"  src="/#/types" style="width: 100%;height: 666px"></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="layui-footer">
      <!-- 底部固定区域 -->
      <!-- © layui.com - 底部固定区域-->

    </div>


    <script type="text/html" id="dataUser">

      <div class="layui-row" style="padding-top: 50px">
        <div class="layui-col-xs4" style="border: solid 0px red;text-align: center;font-size: 20px; background-color: #00F7DE;color: #000ffffff;line-height: 50px">
          <div class="grid-demo grid-demo-bg1">账号：</div>
        </div>
        <div class="layui-col-xs8" style="border: solid 0px red;padding-left:5px; font-size: 20px;line-height: 50px">
          <div class="grid-demo">{{UserDate.shopId}}</div>
        </div>
      </div>
      <div class="layui-row" style="padding-top: 20px">
        <div class="layui-col-xs4 emlName" style="border: solid 0px red;text-align: center;font-size: 20px; background-color: #00F7DE;color: #ffffff;line-height: 50px">
          <div class="grid-demo grid-demo-bg1">商店名称：</div>
        </div>
        <div class="layui-col-xs8" style="border: solid 0px red;font-size: 20px;line-height: 50px;padding-left:5px;">
          <div class="grid-demo">{{UserDate.shopName}}</div>
        </div>
      </div>

    </script>

    <!--修改的模版-->
    <script id="form" type="text/html">
      <form class="layui-form" lay-filter="dome">
        <input type="hidden" name="id" value="" id="newId">

        <div class="layui-form-item">
          <label for="" class="layui-form-label" style="padding-top:20px ">账号*</label>
          <div class="layui-input-block" style="padding-top:20px ">
            <div>{{UserDate.shopId}}</div>
          </div>
        </div>

        <div class="layui-form-item">
          <label for="" class="layui-form-label" style="">原密码*</label>
          <div class="layui-input-block" >
            <input type="text" name="possword" id="possword" value="" lay-verify="required" placeholder="请输入原密码" class="layui-input">
          </div>
        </div>

        <div class="layui-form-item">
          <label for="" class="layui-form-label" style="">新密码*</label>
          <div class="layui-input-block">
            <input type="text" name="newPossword" id="newPossword" value="" lay-verify="required" placeholder="请输入新密码" class="layui-input">
          </div>
        </div>


        <div class="layui-form-item ">
          <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="form" id="su">确认</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          </div>
        </div>
      </form>
    </script>



  </div>
    
</template>

<script>
    import types from './TypeMappas'
    import {mapState,mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        name: "MerchantType",
        data(){
          return{
            arr:[1],
            count:0,
          }
        },
        mounted(){
          layui.use('element', function(){
            var element = layui.element;
            element.render('nav');
          });
        },
        components:{
          types
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
        },
        personal(){
          layui.use(['table','form','jquery','laytpl','laydate','upload','element'], function () {
              const laytpl = layui.laytpl;
              laytpl($("#dataUser").html()).render({}, function(html){
                layer.open({
                  type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                  shadeClose: true,   //点击到外面就关闭
                  closeBtn: 1,   // 是否显示关闭
                  title: '店铺 - 用户信息',
                  content: html, // $("#dialog").html() vs $("#dialog")   //调用模版
                  area: ['600px', '300px'],
                  scrollbar: false,       //是否允许浏览器出现滚动条
                })
              })
            })
        },
        safety(){
          var _this=this;
          layui.use(['table','form','jquery','laytpl','laydate','upload','element'], function () {
            const laytpl = layui.laytpl;
            const form=layui.form;
            laytpl($("#form").html()).render({}, function(html){
              layer.open({
                type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                shadeClose: true,   //点击到外面就关闭
                closeBtn: 1,   // 是否显示关闭
                title: '店铺 - 用户信息',
                content: html, // $("#dialog").html() vs $("#dialog")   //调用模版
                area: ['600px', '400px'],
                scrollbar: false,       //是否允许浏览器出现滚动条
                success(dom, index) {    //确认按钮后回调
                  form.on("submit(form)", function (e) {
                    console.info("进来",e)
                    var food= {"shopUuid":_this.UserDate.shopId,"shopPassword":e.field.possword,"newPassword":e.field.newPossword}
                    axios.post("http://192.168.2.133:8899/updateShopUser",food).then(res => {
                      /*console.info(res);*/
                      let data = res.data;
                      if (data.code === '0000'){
                        /*console.info(data.data);*/
                        layer.msg('修改成功');
                        layer.closeAll('page');
                      } else{
                        layer.msg('修改失败，请输入正确的密码');

                      /*  alert(data.msg)*/
                      }
                    }).catch(reason => {
                      console.error(reason)
                    }).finally(()=> {
                      console.log(arguments)
                    })

                    return false;
                  })
                }
              })
            })
          })
        }
      },
      mounted() {
        var _this=this;
        layui.use(['table','form','jquery','laytpl','laydate','upload','element'], function () {
          var table = layui.table;
          var form = layui.form;
          /*处理表单*/
          const $ = layui.jquery;
          /*使用jquery*/
          const laytpl = layui.laytpl;
          /*使用渲染模块*/
          const laydate = layui.laydate;
          /*使用时间格式*/
          const upload = layui.upload;
          const element = layui.element;
          /*使用上传*/
          $('.layui-nav-child a').click(function () {
            var options = eval('(' + $(this).data('options') + ')');
            if(options==null) return
            var url = options.url;
            var title = options.title;
            var id=options.id;
            var urls ="/#"+url;
            var make=-1;
            /*for (var i=0;i<_this.arr.length;i++){
              if(_this.arr[i].id==id){
                make=1;
              }
            }*/
            if(make==-1){
              var d={
                id:id,
                index:_this.count++
              }
              _this.arr.push(d);
              //新增一个Tab项
              element.tabAdd('demo', {
                title: title //用于演示
                ,content: '<iframe scrolling="auto" frameborder="0"  src="'+urls+'" style="width: 100%;height: 666px"></iframe>',
                id:id
              })
            }


        /*    element.on('tabDelete(demo)', function(data){
              for (var i=0;i<_this.arr.length;i++){
                if(_this.arr[i].count==this.index){
                    this.arr.splice(i,1);
                }
              }
            });*/




            element.tabChange('demo', id); //切换到：用户管理
            element.render('nav');
          });
          $('.layui-nav-child dd').click(function () {
                $('.layui-nav-child dd').removeAttr("class");
                $(this).attr("class","layui-bg-green");
          });
        })
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
    .emlName{
      text-align: center;
      font-size: 20px;
      border: solid 1px red;
    }
</style>
