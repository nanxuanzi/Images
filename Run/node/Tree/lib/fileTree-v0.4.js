/*    
    option = {
                //保存目录路径，采用相对路径, 最后不要加/
                savePath: './json',       

                //读取目录，采用相对路径
                readPath: '../fileTree',

                //保存value的路径类型：【绝对或相对路径】（abs/rel）
                path: 'rel'

                //result，存在生成的json

                //base，读取的目录（绝对路径）

                //save，保存的路径（相对路径）    
            }
*/

//require
let fs = require('fs');
let path = require('path');
//准备：opt, init初始化
let init = (opt)=>{

    //opt添加一个result存放内容
    result = opt.result = {}

    //保存的目录路径
    let save = path.resolve(__dirname, opt.savePath).split(path.sep).join('/')
        //该目录路径不存在，则创建它
        fs.open(opt.savePath,'r',(err,fd)=>{
            if(err){
                //创建
                fs.mkdir(opt.savePath,{ recursive: true }, (err) => {
                    if (err) throw err;

                    //保存文件位置(相对路径)，添加到opt基本不变
                    opt.save = opt.savePath +'/'+ key+'.json'
                });
                console.log('保存目录不存在，但我已帮你创建好了！：'+save)
            }
            opt.save = opt.savePath +'/'+ key+'.json'
        })

    //要读取的目录路径(绝对路径)、是否存在
        //读取目录路径
        let read = path.resolve(__dirname, opt.readPath).split(path.sep).join('/')
        
            //该目录路径不存在，停止程序
            fs.open(opt.readPath, 'r', (err,fd)=>{
                
                //base要读取目录的绝对路径
                if(err){//路径不存在
                    opt.base = 'null'

                }else{//存在
                    opt.base = read     
                }
            })
    
    //根据读取目录名，在result内添加 key为目录名，值为空json对象
        //key
        let key = opt.basedir = path.parse(read).name //upload

        //根据key，在result内添加{}, result[key]，也就是value
        let value = result[key] = {} // result[upload]

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
                    
                    //拼接相对路径
                    value[base] = (opt.basedir+'/'+ path.relative(opt.base, file)).split(path.sep).join('/')

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
        
        //写入文件：opt.save = 路径
        fs.writeFile(opt.save, data, 'utf-8', (err)=>{
            if(err){console.log(err)}
            else console.log('OK!')
        })
    }

    readDir(dir, key, value)
}
//tree，主函数
function tree(option) {
    this.opt = option
    let initSet = init(opt) //根据opt初始化并返回值
        let result = initSet[0]   //保存路径
        let save = initSet[1]    //读取路径
        let dir = initSet[2]    //upload
        let key = initSet[3]  // result[upload]
        let value = initSet[4]
    
        if(opt.base == 'null'){
            console.log('要读取的目录不存在吧!')
        }else{
            read(dir, key, value)
        }
}

const upload = {
    savePath: './json',
    readPath: '../../../upload',
    path: 'rel'
}

const reptile = {
    savePath: './json',
    readPath: '../../../reptile',
    path: 'rel'
}


tree(upload)
tree(reptile)
