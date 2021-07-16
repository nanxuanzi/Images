let fs = require('fs')

// fs.mkdir('../../json/a', { recursive: true }, (err) => {
//     if (err) throw err;
//   });

fs.open('../../json','r',(err,fd)=>{
    if(err){console.log('SavePath: exist.')}
    else{
        console.log('不存在')
    }
})