let express = require("express")
let bodyParser = require("body-parser")
let jwt = require("jsonwebtoken")
let app = express();

//jwt加密 秘钥
let sercet = 'qyd'

// 配置bodyParser
app.use(bodyParser.json())

//获取用户信息
app.get("/user",(req,res)=>{

    setTimeout(() => {
        res.json({name:"wangcai"})
    }, 500);
})



// 登录的接口
app.post("/login", (req,res) =>{
    let {username} = req.body;
    if(username === 'admin'){

        //登录成功了返回一个token
        res.json({
            code: 0,
            username: username,

            //expiresIn:60  表示token 60s后边过期
            token: jwt.sign({username:username},sercet,{
                expiresIn: 20
            })
        })
    }else{
        res.json({
            code:1,
            data:"用户名不存在"
        })
    }
})


//验证token的接口
app.get("/validata",(req,res) => {
    let token = req.headers.authorization;
    jwt.verify(token,sercet,(err,decode) =>{
        if(err){
            return res.json({
                code: 1,
                data: "token失效了"
            })
        }else{
            //token合法，需要把token的失效延长
            res.json({
                code: 0,
                username: decode.username,
                token: jwt.sign({username:decode.username},sercet,{
                    expiresIn: 20,
                })
            })
        }
    })
})

app.listen(3000,()=>{
    console.log("服务已启动")
})