/**
 * 定义初始化内容
 */
var returnContent;

/**
 * LayUI操作
 */
layui.use(['form', 'layer', 'layedit','upload'], function(){
    //定义layedit
    var layedit = layui.layedit;
    //上传图片,必须放在"创建一个编辑器"前面
    //layedit.set一定要放在 layedit.build 前面，否则配置全局接口将无效。
    layedit.set({
        uploadImage: {
            url: 'api/upload',//接口url
            type: 'post', //默认post
            data: {
                uid: uid
            }
        }
    });
    //建立编辑器
    var editIndex = layedit.build('myText',{
        height: 500  //设置编辑器高度
    });
    layedit.sync(editIndex);

    /**
     * 添加富文本框数据
     */
    $('#addBtu').click(function () {
        layedit.sync(editIndex);
        var text = $("#myText").val()
        $.ajax({
            url: baseURL + "api/add",
            data:{
                content: text,
                uid: uid
            },
            success: res=>{}
        })
    });
    /**
     * 初始化富文本框数据
     */
    getText()
    //初始化值
    layedit.setContent(editIndex, returnContent);
    //获取认证数据
    function getText() {
        $.ajax({
            url: baseURL + "api/get",
            type: "post",
            async: false,
            data: {
                uid: uid
            },
            success: res=>{
                data = res.data;
                returnContent = data.content;
            }
        })
    }

});