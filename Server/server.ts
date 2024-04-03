import _http from "http";
import _https from "https";
import _url from "url";
import _fs from "fs";
import _express from "express";
import _dotenv from "dotenv";
import _cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import _bcrypt from "bcryptjs";
import _jwt from "jsonwebtoken";

_dotenv.config({ "path": ".env" });


const DBNAME = process.env.DBNAME;
const connectionString: string = process.env.connectionStringAtlas;
const app = _express();


const HTTPS_PORT: number = parseInt(process.env.HTTPS_PORT);
let paginaErrore;
const PRIVATE_KEY = _fs.readFileSync("./keys/privateKey.pem", "utf8");
const CERTIFICATE = _fs.readFileSync("./keys/certificate.crt", "utf8");
const SIMMETRIC_KEY = _fs.readFileSync("./keys/encriptionKey.txt","utf8")
const CREDENTIALS = { "key": PRIVATE_KEY, "cert": CERTIFICATE };
const https_server = _https.createServer(CREDENTIALS, app);


https_server.listen(HTTPS_PORT, () => {
    init();
    console.log(`Il Server è in ascolto sulla porta ${HTTPS_PORT}`);
});

function init() {
    _fs.readFile("./static/error.html", function (err, data) {
        if (err) {
            paginaErrore = `<h1>Risorsa non trovata</h1>`;
        }
        else {
            paginaErrore = data.toString();
        }
    });
}



// 1. Request log
app.use("/", (req: any, res: any, next: any) => {
    console.log(`-----> ${req.method}: ${req.originalUrl}`);
    next();
});

// 2. Gestione delle risorse statiche
app.use("/", _express.static("./static"));

// 3. Lettura dei parametri POST di req["body"] (bodyParser)
app.use("/", _express.json({ "limit": "50mb" }));
app.use("/", _express.urlencoded({ "limit": "50mb", "extended": true }));

// 4. Log dei parametri GET, POST, PUT, PATCH, DELETE
app.use("/", (req: any, res: any, next: any) => {
    if (Object.keys(req["query"]).length > 0) {
        console.log(`       ${JSON.stringify(req["query"])}`);
    }
    if (Object.keys(req["body"]).length > 0) {
        console.log(`       ${JSON.stringify(req["body"])}`);
    }
    next();
});

// 5. Controllo degli accessi tramite CORS
const corsOptions = {
    origin: function (origin, callback) {
        return callback(null, true);
    },
    credentials: true
};
app.use("/", _cors(corsOptions));

app.get('/api/figa', (req, res) => {res.send("Ciao")})

//********************************************************************************************//

app.post("/api/login",async (req, res, next) => {
    let user = req.body.username
    let pass = req.body.password

    const client = new MongoClient(connectionString)
    await client.connect()
    const collection = client.db(DBNAME).collection("utenti")
    let reg = new RegExp(`^${user}$`,"i")
    let rq = collection.findOne({"name":reg},{"projection":{"name":1,"password":1}})
    rq.then((data)=>{
        if(!data){
            res.status(401).send("Username non trovato")
        }
        else if(data.name === "Admin"){
            _bcrypt.compare(pass, data.password,(err,result)=>{
                if(err){
                    res.status(500).send("bcrypt compare error" + err.message)
                }
                else{
                    if(!result){
                        res.status(401).send("Password errata")
                    }
                    else{
                        let token = creaToken(data)
                        console.log(token)
                        res.setHeader("authorization",token)
                        //! Fa si che la header authorization venga restituita al client
                        res.setHeader("access-control-expose-headers","authorization")
                        res.send({"ris":"ok"})
                    }
                }
            })
        }
    }).catch((err)=>{res.status(500).send("Errore esecuzione query "+ err.message)}).finally(() => client.close())
})

function creaToken(user){
    let currentDate = Math.floor(new Date().getTime() / 1000)
    let payLoad = {
        "_id": user._id,
        "username": user.username,
        "iat": user.iat || currentDate,
        "exp": currentDate + parseInt(process.env.TOKEN_DURATION)
    }
    return _jwt.sign(payLoad, SIMMETRIC_KEY)
}

//********************************************************************************************//
// Default route e gestione degli errori
//********************************************************************************************//

app.use("/", (req, res, next) => {
    res.status(404);
    if (req.originalUrl.startsWith("/api/")) {
        res.send(`Api non disponibile`);
    }
    else {
        res.send(paginaErrore);
    }
});

app.use("/", (err, req, res, next) => {
    console.log("************* SERVER ERROR ***************\n", err.stack);
    res.status(500).send(err.message);
});