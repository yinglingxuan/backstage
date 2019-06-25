<template>
  <div>
    <!--列里面的模版-->
      <script type="text/html" id="dataOrder">

        <a class="layui-btn layui-btn-danger layui-btn-xs layui-bg-green" lay-event="examine">查看</a>
      </script>

      <table id="tableOrder" lay-filter="Orders"></table>


    <object data=""  id="objcet" style="opacity:0;position: absolute"></object>


     <script type="text/html" id="OrderTable">

        <table id="tablelist" lay-filter="Orderslist"></table>
      </script>
  </div>

</template>

<script>
    export default {
        name: "OrderMappas",
        data(){
          return{
            as:true,
            uuid:''
          }
        },


        mounted() {
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
          var _this=this;
          layui.use(['table', 'form', 'jquery', 'laytpl', 'laydate', 'upload', 'element'], function () {
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

            table.render({    //引入模块
              elem: '#tableOrder',    //注意id要和上面的htmlid相同
              url: "http://192.168.2.133:8899/getOrder",
              where: {shopUuid: _this.uuid},
              toolbar: '#merDemo',
              page: {   // 开启分页   https://www.layui.com/doc/modules/laypage.html
                limit: 4,    //当前的页数
                limits: [2, 4, 10, 20, 30, 40, 50] //可以选择的当前页数
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
                {field: 'id', title: '订单号'},
                {field: '{addess', title: '用户名',
                  templet:function(data){
                    return data.addess.userName;
                  }},
                {field: 'userPhone', title: '电话',
                  templet:function(data){
                    return data.addess.userPhone;
                  }},
                {field: 'userSex', title: '性别',
                  templet:function(data){
                    if(data.addess.userSex==0){
                      return "女";
                    }
                    return "男"
                  }
                },

                {field: 'userAddress', title: '收货地址',
                  templet:function(data){
                    return data.addess.userAddress;
                  }},

                {field: 'remark', title: '备注'},
                {field: 'orderState', title: '支付状态',templet:function(data){
                      if(data.orderState==0){
                        return "<p style='color: red'>未支付</p>";
                      }
                      return "已支付"
                  }},
                {
                  title: '操作', fixed: 'right', toolbar: '#dataOrder'
                },
              ]],
            })



            // 列的工具栏事件监听
            table.on('tool(Orders)', function (data) {
              if(data.event=="examine"){

                laytpl($("#OrderTable").html()).render({}, function(html) {    //模块渲染  {这里面是放入数据的， 在模版中默认调用为d}
                  layer.open({
                    type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                    shadeClose: true,   //点击到外面就关闭
                    closeBtn: 1,   // 是否显示关闭
                    title: '订单 - 详情',
                    content: html, // $("#dialog").html() vs $("#dialog")   //调用模版
                    area: ['900px', '500px'],
                    scrollbar: false,       //是否允许浏览器出现滚动条
                    success(dom, index) {    //确认按钮后回调

                    }
                  })
                })

                console.info(data.data)
                table.render({    //引入模块
                  elem: '#tablelist',    //注意id要和上面的htmlid相同
                  data:data.data.foods,
                  cols:[[
                    {field: 'id', title: 'ID', type: 'checkbox'},
                    {field: 'type', title: '类型'},
                    {field: 'name', title: '商品名称'},
                    {field: 'price', title: '价格'},
                    {field: 'oldPrice', title: '优惠价格'},
                    {field: 'count', title: '商品数量'},
                    {field: 'icon', title: '商品图片',
                     templet: function (data) {
                        return `<img src=${data.icon} style="width: 100px;height: 30px">`;
                      },
                    },

                  ]]
                })
                //监听行双击事件
                table.on('rowDouble(Orderslist)', function(obj){
                  console.info(obj)
                  layer.open({
                    type: 1,
                    area: ['800px', '750px'],
                    shadeClose:true,
                    anim: 1,
                    title:"图片详情",
                    content: "<img style='width: 100%;;' src="+obj.data.icon+"/>", //这里content是一个普通的String
                  });
                });
              }
            })


            var websocket = null;
            //判断当前浏览器是否支持WebSocket
            if('WebSocket' in window){
              websocket = new WebSocket("ws://192.168.2.188/websocket/"+_this.uuid);
            }
            else{
              alert('Not support websocket')
            }

            //发送消息
            function send(){
              /*var message = document.getElementById('text').value;*/
              websocket.send(message);
            }
            //连接成功建立的回调方法
            websocket.onopen = function(event){

            }
           /* setInterval(function () {
              websocket = new WebSocket("ws://192.168.2.131:8899/websocket?shopUuid=123");
            },30000);*/


            //连接关闭的回调方法
            websocket.onclose = function(){
              /*  setMessageInnerHTML("close");*/
            }
            websocket.onmessage = function(event){
              console.info(event.data)
              $("#objcet").attr("data","http://192.168.2.131:8899/41F888piC5fv.mp3");
              table.reload("tableOrder");
            }
          })
        }
    }
</script>

<style scoped>

</style>
