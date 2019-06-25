<template>
    <div id="typeTitle">
       <!--列里面的模版-->
      <script type="text/html" id="dataToolbar">

        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
      </script>

       <!--工具栏的模版-->
      <script type="text/html" id="merDemo">
        <div class="layui-btn-container">
          <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
          <button class="layui-btn layui-btn-sm" lay-event="delete">删除</button>

        </div>
      </script>

    <!--添加的模版-->
    <script id="form" type="text/html">
      <form class="layui-form" lay-filter="dome">
        <input type="hidden" name="id" value="" id="newId">
        <div class="layui-form-item">
          <label for="" class="layui-form-label" style="padding-top:20px ">类型名称*</label>
          <div class="layui-input-block" style="padding-top:20px ">
            <input type="text" name="name" id="name" value="" lay-verify="required" placeholder="类型名称" class="layui-input">
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
      <table id="tableType" lay-filter="types"></table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "TypeMappas",
        data(){
          return {
              as:true
          }
        },
        methods:{
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
          }
        },
        mounted() {
          var _this=this;
          var storage=window.localStorage; //获取对象
          var id=storage.getItem("data");
          if(id==null||id==''){
            this.as=false;
            this.$message({
              message: '登录失效，请重新登录',
              type: 'success'
            });
            window.location.href = "/#/login"
            return;
          }

          layui.use(['table','form','jquery','laytpl','laydate','upload','element'], function () {
            var table = layui.table;
            var form = layui.form;    /*处理表单*/
            const $ = layui.jquery;     /*使用jquery*/
            const laytpl = layui.laytpl;   /*使用渲染模块*/
            const laydate = layui.laydate;    /*使用时间格式*/
            const upload = layui.upload;      /*使用上传*/

            table.render({    //引入模块
              elem: '#tableType',    //注意id要和上面的htmlid相同
              url: "http://192.168.2.131:8899/getShopType",
              where:{shopUuid:id},
              toolbar: '#merDemo',
              page: {   // 开启分页   https://www.layui.com/doc/modules/laypage.html
                limit: 4,    //当前的页数
                limits: [2,4, 10, 20, 30, 40, 50] //可以选择的当前页数
              },
              request: {
                pageName: 'no',  //页码的参数名称，默认：page
                limitName: 'size' //每页数据量的参数名，默认：limit
              },
              parseData: function (res) { //res 即为原始返回的数据
                res.count = res.page.total
                return res;
              },
              response: {
                statusCode: '0000' //规定成功的状态码，默认：0
              },

              cols: [[
                {field: 'id', title: 'ID', type: 'checkbox'},
                {field: 'typeName', title: '类型名', edit: 'text'},
                {field: 'typeCount', title: '销售量'},
                {
                  title: '操作', fixed: 'right', toolbar: '#dataToolbar'
                },
              ]],
            })
            //监听表格
            layui.table.on('toolbar(types)', function(data){
                 _this.get();
                if(data.event=="add"&&_this.as){
                 /* console.info(data.event);*/
                  //添加的模版
                  laytpl($("#form").html()).render({}, function(html){    //模块渲染  {这里面是放入数据的， 在模版中默认调用为d}
                    layer.open({
                      type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                      shadeClose: true,   //点击到外面就关闭
                      closeBtn: 1,   // 是否显示关闭
                      title: '店铺 - 添加',
                      content: html, // $("#dialog").html() vs $("#dialog")   //调用模版
                      area: ['550px', '400px'],
                      scrollbar: false,       //是否允许浏览器出现滚动条
                      success(dom, index){    //确认按钮后回调
                        form.render();   //更新表单
                        form.on("submit(form)", function(e){
                          axios.post("http://192.168.2.131:8899/addShopType",{shopUuid:id,type:e.field.name}).then(res => {
                            /*console.info(res);*/
                            let data = res.data;
                            if (data.code === '0000'){
                              /*console.info(data.data)*/
                              table.reload("tableType");   //添加成功后刷新
                              layer.closeAll('page');
                            } else{
                              alert(data.msg)
                            }
                          }).catch(reason => {
                            console.error(reason)
                          }).finally(()=> {
                            console.log(arguments)
                          })
                          return false;
                        })
                      }
                    });
                  });
                }else if (data.event=="delete"&&_this.as) {  //删除全部
                  console.info(data.event);
                  let cs = table.checkStatus('tableType');

                  console.info(cs.data);
                  axios.post("http://192.168.2.131:8899/deleteShop",cs.data.map(d => d.id)).then(res => {
                    /*console.info(res);*/
                    let data = res.data;
                    if (data.code === '0000'){
                      /*console.info(data.data)*/
                      table.reload("tableType");   //添加成功后刷新
                    } else{
                      alert(data.msg)
                    }
                  }).catch(reason => {
                    console.error(reason)
                  }).finally(()=> {
                    console.log(arguments)
                  })
                }
            })
            // 列的工具栏事件监听
            table.on('tool(types)', function (data) {
              _this.get();
              if(data.event=="del"&&_this.as){
                console.info(data)
                let ids=[data.data.id];
                axios.post("http://192.168.2.131:8899/deleteShop",ids).then(res => {
                  /*console.info(res);*/
                  let data = res.data;
                  if (data.code === '0000'){
                    /*console.info(data.data)*/
                    table.reload("tableType");   //添加成功后刷新
                  } else{
                    alert(data.msg)
                  }
                }).catch(reason => {
                  console.error(reason)
                }).finally(()=> {
                  console.log(arguments)
                })
              }
            })



            /*监听单元格被修改*/
            table.on('edit(types)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
              console.log(obj.value); //得到修改后的值
              console.log(obj.field); //当前编辑的字段名
              console.log(obj.data); //所在行的所有相关数据
              _this.get();

              axios.post("http://192.168.2.131:8899/updateShop",{shopUuid:id,"id":obj.data.id,"newType":obj.value}).then(res => {
                console.info(res);
                let data = res.data;
                if (data.code === '0000'){
                  /*console.info(data.data)*/
                  table.reload("tableType");   //修改成功后刷新
                  layer.msg('修改成功');
                } else{
                  alert(data.msg)
                }
              }).catch(reason => {
                console.error(reason)
              }).finally(()=> {
                console.log(arguments)
              })
            });
          })
        }
    }
</script>

<style scoped>

</style>
