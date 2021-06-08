/*
    
*/
var neMusic = {
    id:'',
    mids:[],
    status: '',//状态
    on: ()=>{//播放
        //url = url.replace(/auto=0/,'auto=1')
        url = url.replace(/auto=0/,'auto=1')
    },
    off: ()=>{//关闭
        url = url.replace(/auto=1/,'auto=0')
    }
};