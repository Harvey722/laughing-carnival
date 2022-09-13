layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;





    //表单提交监听  首先监听到点击添加模块的事件后
    form.on("submit(addModule)",function (data) {
        // 提交数据时的加载层 （https://layer.layui.com/）
        //提交之后显示数据提交中，请稍后
        var index = layer.msg("数据提交中,请稍后...",{
            //显示图标
            icon:16,
            // 不关闭
            time:false,
            // 设置遮罩的透明度
            shade:0.8
        });


        //上面的流程执行结束后，发送请求地址到后台
        var url = ctx + "/module/add";

        //发送请求  这里的url会跳到后台界面处理 （后台地址 + 表单name名称和value值 + 数据）
        // data.field-表单内组件对应的字段name名字以及对应的value值
        $.post(url,data.field,function(data){
            console.log(data);
            //添加成功后会返回 code200成功的代码
            if(data.code == 200){
                //提示用户添加成功
                layer.msg("模块添加成功",{icon:6});
                //关闭加载层
                layer.close(index);
                //关闭添加窗口
                layer.closeAll("iframe");

                //刷新页面的营销记录
                parent.location.reload();
            }else{
                //如果没有刷新界面，会提示图标和信息
                layer.msg(data.msg,{icon:5});
            }
        });

        //阻止表单提交
        return false;
    })



    $("#closeBtn").click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    });

});
