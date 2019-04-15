import express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
let cidades : any = [];
let bairros : any = [];
let sabores : any = [];
let tamanhos = [
    {
        id : 1,
        name : "Pequeno",
        quantidade_sabores : 1
    },
    {
        id : 2,
        name : "Médio",
        quantidade_sabores : 2
    },
    {
        id : 3,
        name : "Grande",
        quantidade_sabores : 3
    }
]
        cidades.push(
                    {
                        id : 1,
                        name : "Jaraguá do Sul"
                    },
                    {
                        id : 2,
                        name : "Corupá"
                    },
                    {
                        id : 3,
                        name : "Guaramirim"
                    }
                   );
                   
                   
        
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.post('/logon', (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;

        if (userName === "1" && password === "2"){
            const result = req.body;

            return res.json({ result });
        } else{res.status(400).end('Usuário e senha inválidos');}
    });
app.get('/cidades', (request, response) => {
    response.send(cidades);
  });
  app.get('/tamanhos', (request, response) => {
    response.send(tamanhos);
  });
app.get('/bairros/:id', (req, res) => {
    bairros = null;
    let id : any = req.params.id;
    console.log(id+"");
    if (id == 1){
        bairros.push(
                {
                    name : "Centro",
                    value : 1.50
                },
                {
                    name : "Agua Verde",
                    value : 2.35
                },
                {
                    name : "Chico de Paula",
                    value : 3.80
                },
                {
                    name : "Figueira",
                    value : 4
                }
               );
    } else if (id == 2){
        bairros.push(
                {
                    name : "Seminário",
                    value : 6.8
                },
                {
                    name : "Ano bom",
                    value : 6.75
                },
                {
                    name : "Centro",
                    value : 6
                }
               )
            } else if (id == 3){
        bairros.push(
                {
                    name : "Amizade",
                    value : 12
                },
                {
                    name : "Centro",
                    value : 8
                },
                {
                    name : "Avai",
                    value : 7
                },
                {
                    name : "Corticeira",
                    value : 7
                }
               )
    };
    res.send(bairros);
});

app.get('/sabores/:tamanho', (req, res) => {
    sabores = null;
    let tamanho : any = req.params.tamanho;
    console.log(tamanho+"");
    if (tamanho == 1){
        sabores.push(
                {
                    sabor : "Calabresa",
                    preco : 12.00
                },
                {
                    sabor : "Quatro Queijos",
                    preco : 15.00
                },
                {
                    sabor : "Bacon",
                    preco : 12412.00
                },
                {
                    sabor : "Bac22on",
                    preco : 15552.00
                }
               );
    } else if (tamanho == 2){
        sabores.push(
            
            {
                sabor : "Bac22on",
                preco : 14442.00
            },
            {
                sabor : "Bac112on",
                preco : 1112.00
            },
            {
                sabor : "Bac33on",
                preco : 122.00
            },
            {
                sabor : "Bac42on",
                preco : 129.00
            },
            {
                sabor : "Bac5on",
                preco : 127.00
            }
               )
            } else if (tamanho == 3){
                sabores.push(
                    {
                        sabor : "B512on",
                        preco : 1772.00
                    },
                    {
                        sabor : "B52122on",
                        preco : 152.00
                    },
                    {
                        sabor : "Bac2222on",
                        preco : 112.00
                    },
                    {
                        sabor : "Bac2244",
                        preco : 122.00
                    },
                    {
                        sabor : "Bac22o55n",
                        preco : 124.00
                    }
               )
    };
    res.send(sabores);
});

const port: number = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});