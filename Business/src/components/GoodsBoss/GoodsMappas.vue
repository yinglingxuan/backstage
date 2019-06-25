<template>
    <div>
 <!--工具栏的模版-->
      <script type="text/html" id="GoodsMerDemo">
        <div class="layui-btn-container">
          <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
          <button class="layui-btn layui-btn-sm" lay-event="delete">删除</button>
        </div>
      </script>

<!--列里面的模版-->
      <script type="text/html" id="dataToolbar">

        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
      </script>



      <!--添加或者编辑的模版-->
      <script id="form" type="text/html">
        <form class="layui-form" lay-filter="dome">
          <input type="hidden" name="id" value="" id="newId">
          <div class="layui-form-item" style="padding-top: 20px">
            <label for="" class="layui-form-label">商品名称*</label>
            <div class="layui-input-block" style="padding-top: 0px">

              <input type="text" name="name" id="name" value='{{goods.foodName}}' lay-verify="required" placeholder="商品名称" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item ">
            <label for="" class="layui-form-label">上传图片</label>
            <div class="layui-input-block" >
              <button class="layui-btn" id="ubloga"  type="button">上传图片</button>
            </div>
          </div>
          <div class="layui-form-item ">
            <div class="layui-col-md2" style="text-align: right;margin-left: 5px;margin-top: 10px">
              选择类型
            </div>
            <div class="layui-col-md3" style="margin-left: 15px">
              <select name="city"  id="select"  lay-filter="filter"   lay-verify="required|gtZeroNumber2" >
                <option value="-1">请选择类型</option>
                {{datas}}

              </select>
            </div>
          </div>

          <div class="layui-form-item ">
            <label for="" class="layui-form-label">商品价格</label>
            <div class="layui-input-block">
              <input type="foodPrice" name="description" lay-verify="required|gtZeroNumber" placeholder="商品价格" class="layui-input" id="foodPrice">
            </div>
          </div>
          <div class="layui-form-item ">
            <label for="" class="layui-form-label">优惠价</label>
            <div class="layui-input-block">
                <input type="foodNewPrice" name="description" lay-verify="required|gtZeroNumber" placeholder="商品优惠价格" class="layui-input" id="foodNewPrice">

            </div>
          </div>
          <div class="layui-form-item ">
            <label for="" class="layui-form-label">商品库存</label>
            <div class="layui-input-block">
              <input type="foodStock" name="description" lay-verify="required|gtZeroNumber" placeholder="商品库存" class="layui-input" id="foodStock">
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

      <table id="tableGoods" lay-filter="goods"></table>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState,mapGetters} from 'vuex'
    export default {
        name: "TypeMappas",
        data(){
          return{
              da:'',
              typeId:'',
              goods:{},
              imgs:true,  //是否上传图片
              at:[],// 所有的类型
              uuid:'',//当前登录的uuid
              as:true,
          }
        },
        computed:{
            ...mapGetters({
              datas:'datas'
           })
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
          axios.get("http://192.168.2.131:8899/getShopType?shopUuid="+id+"").then(res => {
            /*console.info(res);*/
            let data = res.data;
            if (data.code === '0000'){

              var text;
              for (var i=0;i<data.data.length;i++){
                text=text==undefined?"<option value="+data.data[i].id+">"+data.data[i].typeName+"</option>":text+"<option value="+data.data[i].id+">"+data.data[i].typeName+"</option>";
              }
              this.at=data.data;
              this.$store.state.datas=text;
              /*console.info(data.data);*/
            } else{
              alert(data.msg)
            }
          }).catch(reason => {
            console.error(reason)
          }).finally(()=> {
            console.log(arguments)
          })
        },
        mounted() {
          var _this =this;
          var typeId;
          layui.use(['table','form','jquery','laytpl','laydate','upload','element'], function () {
            var table = layui.table;
            var form = layui.form;    /*处理表单*/
            const $ = layui.jquery;     /*使用jquery*/
            const laytpl = layui.laytpl;   /*使用渲染模块*/
            const laydate = layui.laydate;    /*使用时间格式*/
            const upload = layui.upload;      /*使用上传*/

            const element=layui.element;

            table.render({    //引入模块
              elem: '#tableGoods',    //注意id要和上面的htmlid相同
              url: "http://192.168.2.131:8899/search",
              where:{shopUuid:_this.uuid},
              toolbar: '#GoodsMerDemo',
              page: {   // 开启分页   https://www.layui.com/doc/modules/laypage.html
                limit: 10,    //当前的页数
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
                {field: 'foodUuid', title: 'ID', type: 'checkbox'},
                {field: 'foodName', title: '商品名称'},
                {field: 'typeName', title: '商品类型'},
                {field: 'foodPrice', title: '商品价格'},
                {field: 'foodNewPrice', title: '商品优惠价'},
                {field: 'foodStock', title: '商品库存'},
                {field: 'foodIcon', title: '商品图片'
                  , templet: function (data) {
                    return `<img src=${data.foodIcon} style="width: 100px;height: 30px">`;
                  },

                },
                {
                  title: '操作', fixed: 'right', toolbar: '#dataToolbar'
                },
              ]],
            })
            //监听表格
            layui.table.on('toolbar(goods)', function(data){
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

                        form.on('select(filter)', function(data){
                          /*console.log(data.elem); //得到select原始DOM对象
                          console.log("-----",data.value); //得到被选中的值
                          console.log(data.othis); //得到美化后的DOM对象*/
                          _this.typeId=data.value;

                        });

                        form.on("submit(form)", function (e) {
                          /*layer.msg('请选择图片');*/
                          if(_this.imgs){
                            layer.msg('请选择图片');
                          }

                          return false;
                        });

                        form.verify({
                          gtZeroNumber(value, item){
                            if(!(value && value.match("[0-9]+") && Number(value) > 0)){
                              return '请输入大于0的数字';
                            }
                          },
                          gtZeroNumber2(value, item){
                            if(Number(value) == -1){
                              return '请选择你要的类型';
                            }
                          }
                        })

                        //创建一个上传组件
                        upload.render({
                          elem: '#ubloga'
                          ,url: 'http://192.168.2.131:8899/addGoods',
                          auto: false, //选择文件后不自动上传
                          bindAction: '#su', //指向一个按钮触发上传
                          data: {
                            foodName: function(){
                              /*console.info("id-----------",$('#name').val());*/
                              return $('#name').val();
                            },
                            shopUuid: function(){

                              return _this.uuid;
                            },
                            typeId: function(){
                              console.info("id-----------",typeId);
                              return _this.typeId
                            },
                            foodPrice: function(){
                              console.info("id-----------",$('#foodPrice').val());
                              return $('#foodPrice').val();
                            },
                            foodNewPrice: function(){
                              console.info("id-----------",$('#foodNewPrice').val());
                              return $('#foodNewPrice').val();
                            },
                            foodStock: function(){
                              console.info("id-----------",$('#foodStock').val());
                              return $('#foodStock').val();
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
                            table.reload("tableGoods");   //添加成功后刷新
                            console.info("成功后-----",res)
                            _this.imgs=true;
                            //如果上传失败
                            /*if(res.code > 0){
                              return layer.msg('上传失败');
                            }*/
                            //上传成功
                          }
                        });
                        form.render();
                      }
                    });
                  });
                }else if(data.event=="delete"&&_this.as){  //删除全部
                  _this.get();
                  let cs = table.checkStatus('tableGoods');
                  /*console.info(cs.data.map(d => d.foodUuid));*/
                  axios.post("http://192.168.2.131:8899/deleteGoods",cs.data.map(d => d.foodUuid)).then(res => {
                    /*console.info(res);*/
                    let data = res.data;
                    if (data.code === '0000'){
                      /*console.info(data.data)*/
                      table.reload("tableGoods");   //添加成功后刷新
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

            //监听行双击事件
            table.on('rowDouble(goods)', function(obj){
              console.info(obj)
              layer.open({
                type: 1,
                area: ['800px', '750px'],
                shadeClose:true,
                anim: 1,
                title:"图片详情",
                content: "<img style='width: 100%;;' src="+obj.data.foodIcon+"/>", //这里content是一个普通的String
              });
            });

           // 列的工具栏事件监听
            table.on('tool(goods)', function (data) {
              _this.get();
              if(data.event=="del" &&_this.as){
                let ids=[data.data.foodUuid];
                /*console.info("----------------",ids)*/
                axios.post("http://192.168.2.131:8899/deleteGoods",ids).then(res => {
                  /!*console.info(res);*!/
                  let data = res.data;
                  if (data.code === '0000'){
                    /!*console.info(data.data)*!/
                    table.reload("tableGoods");   //添加成功后刷新
                  } else{
                    alert(data.msg)
                  }
                }).catch(reason => {
                  console.error(reason)
                }).finally(()=> {
                  console.log(arguments)
                })
              }else if(data.event=="edit" &&_this.as){
                /*console.info(data.data)*/
                _this.goods=data.data;
                var texts;
                for (var i=0;i<_this.at.length;i++){
                  /*debugger*/
                  if(_this.at[i].id==data.data.typeId){
                    texts=texts==undefined?"<option value="+_this.at[i].id+" selected>"+_this.at[i].typeName+"</option>":texts+"<option value="+_this.at[i].id+" selected>"+_this.at[i].typeName+"</option>";
                  }else{
                    texts=texts==undefined?"<option value="+_this.at[i].id+">"+_this.at[i].typeName+"</option>":texts+"<option value="+_this.at[i].id+">"+_this.at[i].typeName+"</option>";
                  }
                }

                laytpl($("#form").html()).render(_this.goods, function(html){    //模块渲染  {这里面是放入数据的， 在模版中默认调用为d}


                 var newHtml="<form class='layui-form' lay-filter='dome'>\n" +
                   "          <input type='hidden' name='id' value='' id='newId'>\n" +
                   "          <div class='layui-form-item' style='padding-top: 20px'>\n" +
                   "            <label for='' class='layui-form-label'>商品名称*</label>\n" +
                   "            <div class='layui-input-block' style='padding-top: 0px'>\n" +
                   "\n" +
                   "              <input type='text' name='name' id='name' value="+_this.goods.foodName+" lay-verify='required' placeholder='商品名称' class='layui-input'>\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <label for='' class='layui-form-label'>上传图片</label>\n" +
                   "            <div class='layui-input-block' >\n" +
                   "              <button class='layui-btn' id='ubloga'  type=\"button\">上传图片</button>\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <div class='layui-col-md2' style='text-align: right;margin-left: 5px;margin-top: 10px'>\n" +
                   "              选择类型\n" +
                   "            </div>\n" +
                   "            <div class='layui-col-md3' style='margin-left: 15px'>\n" +
                   "              <select name='city'  id='select'  lay-filter='filter'   lay-verify='required|gtZeroNumber2' >\n" +
                   "                <option value='-1'>请选择类型</option>\n" +
                   "                \n" +texts+"\n"+
                   "\n" +
                   "              </select>\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <label for='' class='layui-form-label'>商品价格</label>\n" +
                   "            <div class='layui-input-block'>\n" +
                   "              <input type='foodPrice' name='description' lay-verify='required|gtZeroNumber' placeholder='商品价格' class='layui-input' id='foodPrice'  value="+_this.goods.foodPrice+">\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <label for='' class='layui-form-label'>优惠价</label>\n" +
                   "            <div class='layui-input-block'>\n" +
                   "                <input type='foodNewPrice' name='description' lay-verify='required|gtZeroNumber' placeholder='商品优惠价格' class='layui-input' id='foodNewPrice'  value="+_this.goods.foodNewPrice+">\n" +
                   "\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <label for='' class='layui-form-label'>商品库存</label>\n" +
                   "            <div class='layui-input-block'>\n" +
                   "              <input type='foodStock' name='description' lay-verify='required|gtZeroNumber' placeholder='商品库存' class='layui-input' id='foodStock' value="+_this.goods.foodStock+">\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "\n" +
                   "          <div class='layui-form-item '>\n" +
                   "            <div class='layui-input-block'>\n" +
                   "              <button class='layui-btn' lay-submit lay-filter='form' id='su'>确认</button>\n" +
                   "              <button type='reset' class='layui-btn layui-btn-primary'>重置</button>\n" +
                   "            </div>\n" +
                   "          </div>\n" +
                   "        </form>";


                  form.render();
                  layer.open({
                    type: 1,      //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                    shadeClose: true,   //点击到外面就关闭
                    closeBtn: 1,   // 是否显示关闭
                    title: '店铺 - 修改',
                    content: newHtml, // $("#dialog").html() vs $("#dialog")   //调用模版
                    area: ['550px', '400px'],
                    scrollbar: false,       //是否允许浏览器出现滚动条
                    success(dom, index){    //确认按钮后回调
                      _this.goods=data.data;
                      form.render();   //更新表单

                      form.on('select(filter)', function(data){
                        /*console.log(data.elem); //得到select原始DOM对象
                        console.log("-----",data.value); //得到被选中的值
                        console.log(data.othis); //得到美化后的DOM对象*/
                        _this.typeId=data.value;

                      });

                      form.on("submit(form)", function (e) {
                        if(_this.imgs){
                          layer.msg('默认上传');
                            var food={"foodUuid":data.data.foodUuid,
                                      "foodName":$('#name').val(),
                                      "shopUuid":"123",
                                      "typeId":_this.typeId,
                                      "foodPrice":$('#foodPrice').val(),
                                      "foodNewPrice":$('#foodNewPrice').val(),
                                      "foodStock":$('#foodStock').val(),
                                      "foodIcon":data.data.foodIcon};
                            axios.post("http://192.168.2.131:8899/updateGoods2",food).then(res => {
                              /*console.info(res);*/
                              let data = res.data;
                              if (data.code === '0000'){
                                /*console.info(data.data)*/
                                table.reload("tableGoods");   //添加成功后刷新
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
                        gtZeroNumber2(value, item){
                          if(Number(value) == -1){
                            return '请选择你要的类型';
                          }
                        }
                      })



                      console.info("------------",_this.typeId)

                      //创建一个上传组件
                      upload.render({
                        elem: '#ubloga'
                        ,url: 'http://192.168.2.131:8899/updateGoods',
                        auto: false, //选择文件后不自动上传
                        bindAction: '#su', //指向一个按钮触发上传
                        data: {
                          foodUuid: function(){
                            /*console.info("id-----------",$('#name').val());*/
                            return data.data.foodUuid;
                          },
                          foodName: function(){
                            /*console.info("id-----------",$('#name').val());*/
                            return $('#name').val();
                          },
                          shopUuid: function(){

                            return _this.uuid;
                          },
                          typeId: function(){
                            console.info("id-----------",typeId);
                            return _this.typeId
                          },
                          foodPrice: function(){
                            console.info("id-----------",$('#foodPrice').val());
                            return $('#foodPrice').val();
                          },
                          foodNewPrice: function(){
                            console.info("id-----------",$('#foodNewPrice').val());
                            return $('#foodNewPrice').val();
                          },
                          foodStock: function(){
                            console.info("id-----------",$('#foodStock').val());
                            return $('#foodStock').val();
                          },
                          foodIcon:function () {
                            return data.data.foodIcon;
                          }
                        }
                        ,choose: function(obj){
                          //预读本地文件示例，不支持ie8
                          obj.preview(function(index, file, result){
                           /* console.info(result);*/ //图片链接（base64）
                            _this.imgs=false;
                          });
                        }
                        ,done: function(res){
                          layer.closeAll('page');
                          table.reload("tableGoods");   //添加成功后刷新
                          console.info("成功后-----",res)
                          //如果上传失败
                          /*if(res.code > 0){
                            return layer.msg('上传失败');
                          }*/
                          //上传成功
                          _this.imgs=true;
                        }
                      });
                      form.render();
                    }
                  });
                });
              }
            })
          })
        }
    }
</script>

<style scoped>

</style>
