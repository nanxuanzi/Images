$(function(){//文档加载完成后再操作
    //打开Github项目仓库
    $("div#info h1").click(
        function(){
            window.open("https://github.com/nanxuanzi/Images");
        }
    );
    //打开Github个人信息
    $("div#info p").click(function(){
        window.open("https://github.com/nanxuanzi");
    });
})