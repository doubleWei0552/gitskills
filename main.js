// 通过require引入express模块
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

global.baseDir = __dirname;//设置存储全局目录路径

app.use(bodyParser.json({extend:false}));
app.use(bodyParser.urlencoded());

// 引入模板引擎
app.engine('art',require('express-art-template'));
/**
 * express中的路由遵循的匹配规则为
 * 1.路由从上往下进行匹配，直到找到为止
 * 2.如果回调函数中有next那么会继续执行
 * 3、直到找到为止
 * 4.默认会访问根节点路由，
 *      如果存在静态资源目录会访问其中的index.html文件，
 *      但是依然遵循从上往下查找
 * 5、一个项目可以包含多个静态资源目录
 */

app.get('/',(req,res,next)=>{
    next();
})

app.get('/index.html',(req,res)=>{
    res.send('<h3>呵呵</h3>')
})

// ./表示当前目录
// 常见的静态资源目录命名如：public，www,assets

app.use(express.static('./public'));
app.use('/www',express.static('./www'));

app.get('/art',(req,res)=>{
    // render 参数1表示模板文件的名字
    res.render('tem.art',{
        title:'我是一个文字',
        content : `<h5 style="color:red;">我是一个h5标签</h5>`
    })
})

app.post('/art',(req,res)=>{
    console.log(req.body);
    res.render('show.art',req.body);
})

// 引入通用文件
app.use('/common',require('./routes/common'));

app.listen(3301,()=>{
    console.log('server is running on 3301');
})