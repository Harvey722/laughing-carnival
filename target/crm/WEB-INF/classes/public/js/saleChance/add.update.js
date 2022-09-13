layui.use(['form','jquery','jquery_cookie'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        $ = layui.jquery_cookie($);



    //加载下拉框  营销机会指派给。。。
    //首先接收前台前台post请求会跳转到后台
    $.post(ctx+"/sale_chance/queryAllSales",function (data){
        //获取下拉框  通过$符号来获取字段assign指派人
        var am = $("#assignMan");
        // <#--获取当前数据的指派人id的值-->
        var aid = $("#assignId").val();
        //进行判断如果当前的数据不为空的时候，那么遍历数据
        if(data != null){
            for(var i = 0; i < data.length; i++){

                //回显当前数据的指派人 这里的Dataid.id
                if(aid == data[i].id){
                    var opt = "<option selected value="+data[i].id+">"+data[i].name+"</option>";
                }else{
                    var opt = "<option value="+data[i].id+">"+data[i].name+"</option>";
                }
                //现有的追加
                am.append(opt);
            }
        }
        // 重新渲染下拉框内容
        layui.form.render("select");
    });


    /**
     * 监听表单的提交
     *     on监听 submit事件
     */
    form.on('submit(addOrUpdateSaleChance)',function (data){
        // 提交数据时的加载层 （https://layer.layui.com/）
        var index = layer.msg("数据提交中,请稍后...",{
            icon:16, // 图标
            time:false, // 不关闭
            shade:0.8 // 设置遮罩的透明度
        });
        var url= ctx + "/sale_chance/save";

        //判断当前页面中是否有id值，如果有则是修改
        //如果从属性选择器中拿到值通过 el表达式
        if($("#hidId").val()){
            url= ctx + "/sale_chance/update";
        }

        console.log(data.field);
        //发送请求  从前端获取function (data)即dom对象
        $.post(url,data.field,function (data){
            if(data.code == 200){
                //关闭弹出框
                layer.close(index);
                //关闭iframe层
                layer.closeAll("iframe");
                //刷新父页面，将添加的新数据展示
                parent.location.reload();
            }else{
                layer.msg(data.msg,{icon:5})
            }
        });

        return false;//阻止表单提交
    })
    $("#closeBtn").click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    });
});

