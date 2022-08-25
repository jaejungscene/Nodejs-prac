const express = require('express');
const cors = require('cors');
const models = require('./models');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/products", (req, res)=>{
    const query = req.query;
    console.log("query : ", query);
    res.send({
        "products" : [
            {
                "id" : 1,
                "name": "농구공",
                "price": 100000,
                "seller": "조던",
                "imageUrl": "images/products/basketball1.jpeg"
            },
            {
                "id": 2,
                "name": "축구공",
                "price": 50000,
                "seller": "메시",
                "imageUrl": "images/products/soccerball1.jpg"
            },
            {
                "id" : 3,
                "name": "키보드",
                "price": 10000,
                "seller": "그랩",
                "imageUrl": "images/products/keyboard1.jpg"
            }
      ]
    });
})

app.post("/products", (req,res)=>{
    const body = req.body;
    const {name, description, price, seller} = body;
    if(!name || !description || !price || !seller){
        res.send("모든 필드를 입력해주세요.");
    }
    models.Products.create({
        name,
        description,
        price,
        seller,
    }).then((result)=>{
        console.log("상품생성 결과:",result);
        res.send({
            result,
        });
    }).catch((error)=>{
        console.error(error);
        res.send("상품 업로드에 문제가 발생했습니다.");
    });
})

app.get("/products/:id", (req,res)=>{
    const params = req.params;
    const {id} = params;
    res.send(`id는 ${id}입니다.`);
})

app.listen(port, ()=>{
    console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다");
    models.sequelize.sync()
    .then(()=>{
        console.log('DB 연결 성공!');
    })
    .catch((err)=>{
        console.error(err);
        console.log('DB 연결 에러');
        process.exit();
    });
})