//require
let fs = require('fs');
let path = require('path');

//准备：opt, init初始化
const opt = {
    //保存目录：默认为 【./json/dir.json】
    savaPath: './josn',//暂时用不到

    //读取目录
    readPath: '../../../upload',

    //路径：绝对或相对（abs/rel）
    path: 'rel',

    //result
    //base

    //save    
}
let init = (opt)=>{

    //opt添加一个result存放内容
    result = opt.result = {}

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
        opt.base = read     //读取目录
        opt.save = './json/'+ key+'.json' //保存的文件(绝对路径)
    
    return [result, save, read, key, value]
}
//- - - - end - - - - //

let read = (dir, key, value)=>{
    
    
    //读取目录
    let readDir = (dir, key, value) => {
        this.dir = dir
        this.key = key
        this.value = value

        //读取目录，获取files
        fs.readdir(dir, (err, files) => {
            if (err) { console.log(err) }

            //遍历文件files
            files.forEach((file) => {

                //file 完整路径
                let full = (dir + '/' + file).split(path.sep).join('/')
                file = full
    
                //判断file类型
                fs.stat(file, (err, stats) => {
                    if (err) { reject(err) }

                    //文件
                    if (stats.isFile()) {
                        isFile(file, key, value)         
                    } else
                    //目录
                    if (stats.isDirectory()) {
                        isDir(file, key, value)
                    } else {
                        console.log('发现了一个既不是文件也不是目录的家伙。')
                    }
                })
            })
        })  
    }
    
    //判断file类型        
        let isFile = (file, key, value)=>{//文件
            //file是完整路径
            this.file = file
            this.key = key
            this.value = value
        
            //base：【文件名.扩展名】，例如 a.txt
            let base = path.basename(file)
        
            //键值对存入{}，value[base] = file
                // 值(file)的路径问题
                if(opt.path == 'abs'){//绝对路径
                    
                    value[base] = file 

                    //将result写入文件
                    saveFile(result)     
                }else if(opt.path == 'rel'){//相对路径                    
                    
                    value[base] = path.relative(opt.base, file).split(path.sep).join('/')

                    //将result写入文件
                    saveFile(result)
                    
                }else{
                    console.log('你好像没有配置好。')
                }
        }
       
        let isDir = (file, key, value)=>{//目录
            //file是完整路径    【目录】
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

    //保存result
    let saveFile = (result)=>{
        //格式化result，
        let data = JSON.stringify(result, null, 4)
        
        //写入文件：opt.save = './json/目录.json'
        fs.writeFile(opt.save, data, 'utf-8', (err)=>{
            if(err){console.log(err)}
            else console.log('OK!')
        })
    }

    readDir(dir, key, value)
    return opt.result
}

//tree，主函数
function tree(opt) {
    let initSet = init(opt) //根据opt初始化并返回值
        let result = initSet[0]   //保存路径
        let save = initSet[1]    //读取路径
        let dir = initSet[2]    //upload
        let key = initSet[3]  // result[upload]
        let value = initSet[4]

    read(dir, key, value)
}
tree(opt)

