/*
	【功能】：解析json并将图片的src传入img标签
*/

//获取json对象
$(function(){
    //get请求json https://cdn.jsdelivr.net/gh/nanxuanzi/Images@master
    $.get('https://cdn.jsdelivr.net/gh/nanxuanzi/Images@master/json/Images.json',(data,status)=>{
        if(status='success'){
            console.log('请求json成功！')
            console.log(status)

            //h data.img.h
            for(let key in data.img.h){
                //获取路径字符串
                let path = data.img.h[key]
                //路径传入src
                $('.img-box#h').append("<img src='"+path+"'/>");
            }

            //i
            for(let key in data.ImgHosting.toux){
                //获取路径字符串
                let path = data.ImgHosting.toux[key]
                //路径传入src
                $('.img-box#i').append("<img src='"+path+"'/>");
            }
            //v data.img.v.girl
            for(let key in data.img.v.girl){
                //获取路径字符串
                let path = data.img.v.girl[key]
                //路径传入src
                $('.img-box#v').append("<img src='"+path+"'/>");
            }
        }
        else{
            console.log('请求json失败！')
            $('.img-box').append('<p>图片加载失败...</p>')
        }
        
      
    });
});