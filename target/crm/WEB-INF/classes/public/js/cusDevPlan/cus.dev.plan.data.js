layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    /**
     * 计划项数据展示
     */
    var  tableIns = table.render({
        elem: '#cusDevPlanList',
        url : ctx+'/cus_dev_plan/list?sId='+$('[name="id"]').val(),
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "cusDevPlanListTable",
        cols : [[
            {type: "checkbox", fixed:"center"},
            {field: "id", title:'编号',fixed:"true"},
            {field: 'planItem', title: '计划项',align:"center"},
            {field: 'exeAffect', title: '执行效果',align:"center"},
            {field: 'planDate', title: '执行时间',align:"center"},
            {field: 'createDate', title: '创建时间',align:"center"},
            {field: 'updateDate', title: '更新时间',align:"center"},
            {title: '操作',fixed:"right",align:"center", minWidth:150,templet:"#cusDevPlanListBar"}
        ]]
    });


    /**
     * 监听头部工具栏
     */
    table.on('toolbar(cusDevPlans)', function(obj){
        // var checkStatus = table.checkStatus(obj.config.id);
        // console.log(checkStatus.data);
        switch(obj.event){
            case 'add'://执行添加 跳转到添加事件函数
                addOrUpdateCusDevPlanDialog();
                break;
            case 'success': //执行成功 跳转到成功事件函数并且把devresult值改为2
                updateDevResult(2);
                break;
            case 'failed':  //执行失败 跳转到成功事件函数并且把devresult值改为2
                updateDevResult(3);
                break;
        };
    });

    //更新营销机会的开发状态
    function updateDevResult(devResult){

        var id = $('[name="id"]').val();
        $.post(ctx+"/sale_chance/updateDevResult",{id:id,devResult:devResult},function (data){
            if(data.code == 200){
                //刷新页面
                parent.location.reload();
                //关闭
                // tableIns.reload();
            }else{
                layer.msg(data.msg,{icon:5});
            }
        });
    }


    /**
     * 监听行工具栏
     */
    table.on('tool(cusDevPlans)', function(obj){
        //编辑/修改功能
        if(obj.event == "edit"){
            addOrUpdateCusDevPlanDialog(obj.data.id);
        }else if(obj.event == "del"){
            /*
           询问用户是否确认删除
            1、前端会先把删除请求传回Controller层
            2、Controller层会调用Service层进行判断语句判断语句进行判断，比如非空判断或者其他判断
            3、service层调用dao层接口抽象方法来映射mapper文件的数据库更新语句操作数据库
            4、操作成功Controler层直接返回给前端
             */
            layer.confirm("确定删除当前数据么？!", {icon:3, title:"开发计划管理"}, function (index) {
                $.post(ctx+"/cus_dev_plan/delete",{id:obj.data.id},function (data){
                    if(data.code == 200){
                        //关闭确认框
                        layer.close(index);
                        //刷新页面
                        window.location.reload();
                        //关闭
                        // tableIns.reload();
                    }else{
                        layer.msg(data.msg,{icon:5});
                    }
                });
            });
        }
    });



    //打开计划项修改添加窗口
    function addOrUpdateCusDevPlanDialog(id){
        //添加操作    标题
        var title = "<h2>计划项管理-添加计划项</h2>";
        //jquery获取 salechanceId
        var url = ctx+"/cus_dev_plan/toAddOrUpdatePage?sId="+$('[name="id"]').val(); //这里用el表达式通过id来获取输入的值

        //修改操作有id值
        if(id){
            title = "<h2>计划项管理-修改计划项</h2>";
            url += "&id="+id;
        }

        //通过layui iframe打开
        layer.open({
            type:2, //类型2 成功的
            title:title,
            content:url,
            maxmin:true, //可调窗口
            area:["500px","300px"]//文本框大小
        });


    }




});
