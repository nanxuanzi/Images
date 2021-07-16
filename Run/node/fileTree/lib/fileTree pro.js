//require
let fs = require('fs');
let path = require('path');

//准备：opt, result, init初始化
const opt = {
    //保存位置
    savaPath: './josn',

    //读取路径
    readPath: '../../../upload',

    //绝对路径abs 或 相对路径rel
    path: 'rel'
}
const result = {}

function init(opt) {
    //保存目录
    let save = path.resolve(__dirname, opt.savaPath).split(path.sep).join('/')

    //读取目录
    let read = path.resolve(__dirname, opt.readPath).split(path.sep).join('/')
    
    //根据读取目录名，在result内添加 key为目录名，值为json对象
        //key
        let key = path.parse(read).name //upload

        //根据key，在result内添加{}, result[key]
        let value = result[key] = {} // result[upload]

    //添加opt属性，基本不变的
        opt.base = read     //
        opt.save = save +'/'+ key+'.json'  
    
    return [save, read, key, value]
}

// - - - - end - - - - //

//Promise封装，resolve('成功')
let read = function(dir, key, value){
    return new Promise((resolve, reject)=>{
        
        let readDir = (dir, key, value) => {
            this.dir = dir
            this.key = key
            this.value = value
            fs.readdir(dir, (err, files) => {//文件集合
                if (err) { reject(err) }
                files.forEach((file) => {//获取单个文件名
                    //绝对路径，目录分隔符 /
                    let full = (dir + '/' + file).split(path.sep).join('/')
                    file = full
        
                    //判断file类型
                    fs.stat(file, (err, stats) => {
                        if (err) { reject(err) }
                        if (stats.isFile()) {
                            isFile(file, key, value)
                            // console.log(result)                    
                        } else if (stats.isDirectory()) {
                            isDir(file, key, value)
                        } else {
                            console.log('发现了一个既不是文件也不是目录的家伙。')
                        }
                    })
                })
            })  
        }
        
        function isFile(file, key, value) {//file是完整路径   【文件】
            this.file = file
            this.key = key
            this.value = value
        
            //文件，则添加到当前 {}
            let base = path.basename(file)//取文件名+扩展名 a.txt
        
            //相对/绝对
            if(opt.path == 'abs'){
                value[base] = file  // value[key] = 绝对位置
                // resolve('成功')

            }else if(opt.path == 'rel'){
                
                //value[key] = 相对位置
                value[base] = path.relative(opt.base, file).split(path.sep).join('/')
                
                // resolve('成功')
                
            }else{
                console.log('你好像没有配置好。')
            }
            // return 'a'+ result
        }
        
        function isDir(file, key, value) {//file是完整路径    【目录】
            this.file = file
            this.key = key
            this.value = value
            
            //更新 dir,key value
            dir = file
            key = path.parse(file).base
           
            value = value[key] = {} // //value更新,value = value[key] = {}
           
            // //递归读取目录
            readDir(dir, key, value)
        }

        readDir(dir, key, value)
    })
}

//保存文件
function saveFile(result){
    fs.writeFile(opt.save, result,(err)=>{
        if(err){console.log(err)}
        else{
            console.log('写入成功')
        }

    })
}

//tree
async function tree(opt) {
    let initSet = init(opt) //根据opt初始化并返回值
        let save = initSet[0]   //保存路径
        let dir = initSet[1]    //读取路径
        let key = initSet[2]    //upload
        let value = initSet[3]  // result[upload]

        // await read(dir, key, value)
        // await save(r)
        
        await read(dir, key, value).then(

            ).catch((err)=>{//catch错误
            console.error(err)
        })   
        console.log(result)
}

tree(opt)

// console.log(result)
