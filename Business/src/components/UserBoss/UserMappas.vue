<template>
  <div>




     <!--添加或者编辑的模版-->
      <script id="form" type="text/html">
        <form class="layui-form" lay-filter="dome">
          <input type="hidden" name="id" value="" id="newId">
          <div class="layui-form-item" style="padding-top: 20px">
            <label for="" class="layui-form-label">店铺名称*</label>
            <div class="layui-input-block" style="padding-top: 0px">

              <input type="text" name="name" id="name" value='{{UserDate.shopName}}' lay-verify="required" placeholder="店铺名称" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item ">
            <label for="" class="layui-form-label">上传头像</label>
            <div class="layui-input-block" >
              <button class="layui-btn" id="ubloga"  type="button">上传头像</button>
            </div>
          </div>
          <div class="layui-form-item ">
            <label for="" class="layui-form-label">配送费</label>
            <div class="layui-input-block">
              <input type="deliveryPrice" value="{{UserDate.deliveryPrice}}" name="deliveryPrice" lay-verify="required|gtZeroNumber" placeholder="配送费" class="layui-input" id="deliveryPrice">
            </div>
          </div>
           <div class="layui-form-item ">
            <label for="" class="layui-form-label">起送价</label>
            <div class="layui-input-block">
              <input type="minPrice" value="{{UserDate.minPrice}}" name="minPrice" lay-verify="required|gtZeroNumber" placeholder="起送价" class="layui-input" id="minPrice">
            </div>
          </div>

          <div class="layui-form-item ">
            <label for="" class="layui-form-label">联系电话</label>
            <div class="layui-input-block">
              <input type="shopPhone" value="{{UserDate.shopPhone}}" name="shopPhone" lay-verify="required" placeholder="联系电话" class="layui-input" id="shopPhone">
            </div>
          </div>

          <div class="layui-form-item ">
            <label for="" class="layui-form-label">店家描述</label>
            <div class="layui-input-block">
              <input type="description" value="{{UserDate.description}}" name="description"  placeholder="描述" class="layui-input" id="description">
            </div>
          </div>

          <div class="layui-form-item ">
            <label for="" class="layui-form-label">公告</label>
            <div class="layui-input-block">
              <input type="bulletin" value="{{UserDate.bulletin}}" name="bulletin"  placeholder="公告" class="layui-input" id="bulletin">
            </div>
          </div>

          <div class="layui-form-item ">
            <label for="" class="layui-form-label">营业时间</label>
            <div class="layui-input-block">
              <input style="width: 100px" type="sellTime" value="{{UserDate.sellTime}}" name="sellTime"  placeholder="公告" class="layui-input" id="sellTime">
            </div>
          </div>

           <div class="layui-form-item ">
            <label for="" class="layui-form-label">结束营业</label>
            <div class="layui-input-block">
              <input style="width: 100px" type="finishTime" value="{{UserDate.finishTime}}" name="finishTime"  placeholder="公告" class="layui-input" id="finishTime">
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


    <div class="title">
      <el-row>
        <el-col :span="24"><div class="bodyMappas">商家信息</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newdiv imgs">
            <img :src="UserDate.shopIcon" style="width: 100%;border-radius: 50%;"/>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5"><div class="newdiv titleName">店家账号:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.shopId}}</div></el-col>
        <el-col :span="5"><div class="newdiv titleName">配送费:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.deliveryPrice}}元</div></el-col>
      </el-row>


      <el-row>
        <el-col :span="5"><div class="newdiv titleName">店家名称:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.shopName}}</div></el-col>

        <el-col :span="5"><div class="newdiv titleName">店家状态:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.shopStatus==1?'上线中...':'下线'}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="5"><div class="newdiv titleName">商家描述:</div></el-col>
        <el-col :span="19"><div class="newdiv texts">{{UserDate.description}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="5"><div class="newdiv titleName">商家公告:</div></el-col>
        <el-col :span="19"><div class="newdiv texts">{{UserDate.bulletin}}</div></el-col>
      </el-row>


      <el-row>
        <el-col :span="5"><div class="newdiv titleName">平均配送时间:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.deliveryTime}}分钟</div></el-col>

        <el-col :span="5"><div class="newdiv titleName">起送价:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.minPrice}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="5"><div class="newdiv titleName">月售:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.sale}}</div></el-col>

        <el-col :span="5"><div class="newdiv titleName">联系电话:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.shopPhone}}</div></el-col>
      </el-row>


      <el-row>
        <el-col :span="5"><div class="newdiv titleName">营业时间:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.sellTime}}</div></el-col>

        <el-col :span="5"><div class="newdiv titleName">结束时间:</div></el-col>
        <el-col :span="7"><div class="newdiv texts">{{UserDate.finishTime}}</div></el-col>
      </el-row>

    </div>

    <div class="buttons" style="margin-top: 20px;">
      <el-button style="margin-left: 40%; " type="success" @click="ubdates">点击修改信息</el-button>
    </div>


  </div>

</template>

<script>
    import axios from 'axios';
  import {mapState,mapGetters} from 'vuex'
    export default {
        name: "UserMappas",
        data(){
          return{
            datas:{},
            sellTime:'',
            imgs:true,
            as:true,
            uuid:''
          }
        },
        computed:{
          ...mapGetters({
            UserDate:'UserDate'
          })
        },
        created(){
          var storage=window.localStorage; //获取对象
          var id=storage.getItem("data");
          this.uuid=id;
          if(id==null||id==''){
            this.as=false;
            this.$message({
              message: '登录失效，请重新登录',
              type: 'success'
            });
            window.location.href = "/#/login"
            return;
          }
          axios.get("http://192.168.2.133:8899/getShopMessage?uuid="+id+"").then(res => {
            let data = res.data;
            if (data.code === '0000'){
              this.$store.state.UserDate=data.data;
            } else{
              alert(data.msg)
            }
          }).catch(reason => {
            console.error(reason)
          }).finally(()=> {
            /*console.log(arguments)*/
          })
        },
        methods:{
            updatas(){
              axios.get("http://192.168.2.133:8899/getShopMessage?uuid="+this.uuid+"").then(res => {
                let data = res.data;
                if (data.code === '0000'){
                  this.$store.state.UserDate=data.data;
                } else{
                  alert(data.msg)
                }
              }).catch(reason => {
                console.error(reason)
              }).finally(()=> {
                /*console.log(arguments)*/
              })
            },
          get(){
            var storage=window.localStorage; //获取对象
            var id=storage.getItem("data");
            this.uuid=id;
            if(id==null||id==''){
              this.as=false;
              this.$message({
                message: '登录失效，请重新登录',
                type: 'success'
              });
              window.location.href = "/#/login"
              return;
            }
          },

          ubdates(){
            this.get();
            if(this.as){

              var _this =this;
              /*console.info("修改");*/
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
                /*使用上传*/
                const element = layui.element;


                //添加的模版
                laytpl($("#form").html()).render({}, function(html){    //模块渲染  {这里面是放入数据的， 在模版中默认调用为d}
                  layer.open({
                    type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                    shadeClose: true,   //点击到外面就关闭
                    closeBtn: 1,   // 是否显示关闭
                    title: '店铺 - 添加',
                    content: html, // $("#dialog").html() vs $("#dialog")   //调用模版
                    area: ['750px', '700px'],
                    scrollbar: false,       //是否允许浏览器出现滚动条
                    success(dom, index){    //确认按钮后回调
                      form.render();   //更新表单
                      laydate.render({
                        elem: '#sellTime', //指定元素
                        type: 'time',
                      });
                      laydate.render({
                        elem: '#finishTime', //指定元素
                        type: 'time',
                      });


                      form.on("submit(form)", function (e) {
                        /*layer.msg('请选择图片');*/
                        if(_this.imgs){
                          /*layer.msg('请选择图片');*/
                          /*console.info(e)*/
                          var food={"shopId":_this.UserDate.shopId,
                            "shopName":e.field.name,
                            "deliveryPrice":e.field.deliveryPrice,
                            "minPrice":e.field.minPrice,
                            "shopPhone":e.field.shopPhone,
                            "description":e.field.description,
                            "bulletin":e.field.bulletin,
                            "sellTime":e.field.sellTime,
                            "finishTime":e.field.finishTime};
                          /*console.info(food)*/

                          axios.post("http://192.168.2.133:8899/updateShops",food).then(res => {
                            /*console.info(res);*/
                            let data = res.data;
                            if (data.code === '0000'){
                              /*console.info(data.data);*/
                              _this.updatas();
                              layer.closeAll('page');
                            } else{
                              alert(data.msg)
                            }
                          }).catch(reason => {
                            console.error(reason)
                          }).finally(()=> {
                            console.log(arguments)
                          })
                        }
                        return false;
                      });

                      form.verify({
                        gtZeroNumber(value, item){
                          if(!(value && value.match("[0-9]+") && Number(value) > 0)){
                            return '请输入大于0的数字';
                          }
                        },
                      })

                      //创建一个上传组件
                      upload.render({
                        elem: '#ubloga'
                        ,url: 'http://192.168.2.133:8899/updateShops2',
                        auto: false, //选择文件后不自动上传
                        bindAction: '#su', //指向一个按钮触发上传
                        data: {
                          shopId:function(){
                              return  _this.UserDate.shopId;
                          },
                          shopName:function(){
                            return  $("#name").val();
                          },
                          deliveryPrice:function(){
                            return $("#deliveryPrice").val();
                          }
                          ,
                          minPrice:function(){
                            return  $("#minPrice").val();
                          },
                          shopPhone:function(){
                            return   $("#shopPhone").val();
                          },
                          description:function(){
                            return $("#description").val();
                          },
                          bulletin:function(){
                            return $("#bulletin").val();
                          },
                          sellTime:function(){
                            return  $("#sellTime").val();
                          },
                          finishTime:function(){
                            return $("#finishTime").val();
                          },
                        }
                        ,choose: function(obj){
                          //预读本地文件示例，不支持ie8
                          obj.preview(function(index, file, result){
                            /*console.info(result);*/ //图片链接（base64）

                            _this.imgs=false;
                          });
                        }
                        ,done: function(res){
                          layer.closeAll('page');
                       /*   table.reload("tableGoods");   //添加成功后刷新*/
                          /*console.info("成功后-----",res)*/
                          _this.updatas();
                          _this.imgs=true;
                        }
                      });
                      form.render();
                    }
                  });
                });



              })

            }
          }
        }

    }
</script>

<style scoped>
  /* .title{
     !*border: solid 1px red;*!
     width: 1000px;
     margin: auto;
   }*/
   .buttons{
     width: 1000px;
     margin: auto;
   }

   .title .newdiv{
      border-bottom: solid 1px #DCDFE6;
      line-height: 50px;
   }

  .bodyMappas{
    background-color: #606266;
    line-height: 70px;
    font-size: 25px;
    color: #ffffff;
    text-align: center;
  }

  .titleName{
    text-align: center;
    background-color: #606266;
    color: #ffffff;
  }

  .texts{
    padding-left: 10px;
  }
  .imgs {
     border-bottom: solid 1px #DCDFE6;
     width: 100px;
     border-radius: 50%;
     margin: auto;
     padding-top: 10px;
     padding-bottom: 10px;
  }

</style>
