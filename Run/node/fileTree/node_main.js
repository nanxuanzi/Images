let fs = require('fs');
let path = require('path');
var dirname = './img';
const myJson = {
    "author": "nanxuanzi",
    //"img":{}, 
    "ImgHosting": {}
}

let save_path = './json/Images.json'
main('./img')
main('./ImgHosting')
/*
    【介绍】：将某个目录下所有的文件和目录添加到json对象并保存到json文件。
    【用法】：
             1.设置保存json的文件，save_path
             2.输出特定目录，      main(目录), ./ [相对/绝对]

    【思路】：
            json[wo]={}     【相当于在json中创建】  名为wo的对象，
            json[wo][x]={}  【相当于在wo中创建】    名为x的对象

            1.判断目录(wo)中的文件属性,添加到json对象
                a.文件则添加为当前 wo{} 中的属性
                b.目录则在当前 wo{} 内创建与目录同名的 x{}，并向内更新(更新为x{})
                c.递归1
            2.将json对象输出到文件
*/
function main(dir) {//用于读取目录下的文件和目录
    //初始化key, value
    key = jsonAdd(dir)  //生成key，并返回
    var value = myJson[key] //myJson[key]，也就是该key的value
    /*
        value[key] = {}
        也就是在值的内部再创建一个值，不过这个值是{}
        可以在该值内添加属性或者{}
    */

    //读取目录
    readDir(dir, value, key)
}
function readDir(dir, value, key) {//传入数组
    this.dir = dir
    this.value = value
    this.key = key

    fs.readdir(dir, (err, files) => {
        if (err) {
            throw err
        }
        //遍历file(查看每个文件的类型)
        files.forEach((file, index) => {//file是单纯的文件名 a

            var full = dir + '/' + file//【相对】完整路径, dir/
            file = full

            fs.stat(file, (err, stats) => {//文件类型
                if (err) {
                    throw err
                }
                if (stats.isFile()) {//file

                    isFile(file, value, key)


                } else if (stats.isDirectory()) {//dir

                    isDir(file, value, key)

                } else {
                    console.log("发现了一个既不是文件也不是目录的家伙。")
                }

            })

        })

    })

}
function jsonAdd(dir) {//根据【传入的目录】动态添加json属性【key】,并返回该属性【key】
    let key = path.parse(dir).base
    myJson[key] = {}
    return key
}

function isDir(file, value, key) {//file是完整路径    【目录】
    this.file = file
    this.value = value
    this.key = key

    //更新dir, key
    dir = file
    key = path.basename(dir).toString()

    //value更新
    value = value[key] = {}

    //递归读取目录
    readDir(dir, value, key)
}

function isFile(file, value, key) {//file是完整路径   【文件】
    this.file = file
    this.value = value
    this.key = key

    let base = path.basename(file)//取文件名+扩展名 a.txt

    //追加到当前{}，也就是value(动态的)
    value[base] = file
    //格式化输出，否则过多的层级是话node控制台输出的是[Object]
    let data = JSON.stringify(myJson, null, 4)
    //保存json到文件 './myJson.json'
    saveFile(data, save_path)
}
function saveFile(data, save_path) {//json , 存放的json路径
    this.data = data
    this.save_path = save_path
    //data = JSON.stringify(myJson, null, 4)
    fs.writeFile(save_path, data, (err) => {
        if (err) {
            throw err
        } else {
            console.log('写入成功')
        }
    })
}