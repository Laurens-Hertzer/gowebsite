const express = require("express");
const app = express();
const session = require("express-session");
/*const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");*/
const cors = require("cors");
const path = require("path");
const gamecontrol = require("./gamecontrol");
const server = app.listen(process.env.PORT || 3000);
const wss = new WebSocket.Server({ server });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/gamecontrol" , gamecontrol);

//Authentifizierung

//const nextId = () => Math.max(...tasks.map((task) => task.id)) + 1;

/*app.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);*/

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

const users = [
    { username: "test", password: "1" },
    { username: "test2", password: "294" }

]

app.get('/', async (request, response) => {
    if (!request.session.username){
        response.sendFile(path.join(__dirname, '../Frontend', 'login.html'));
    }else{
        response.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
    }
});

app.get('/index.html', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    return res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../Frontend')));

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ error: "You have to put in all the required inputs." })
    }
    if (!req.session.createdAccounts) {
        req.session.createdAccounts = 0;
    } if (req.session.createdAccounts >= 5) {
        return res.status(429).json({ error: "Maximale Anzahl an Accounts erreicht, du brauchst nicht so viele." });
    }
    users.push({ username, password });
    req.session.createdAccounts++;
    res.json({ message: "Account erstellt" });
});

app.post("/login", (req, res) => {
    // #swagger.tags = ['Auth']
    const { username, password } = req.body;

    const foundUser = users.find(user => user.username === username && user.password === password);
    if (!foundUser) {
        return res.status(401).json({ error: "no such user" });
    }

    /*if (password !== "m295"){
        return res.sendStatus(401);
    }
    if(!username) {
        return res.sendStatus(422);
    }*/
    req.session.username = req.body.username;

    res.json({ message: "sucess" });
});

app.get("/verify", (req, res) => {
    if (req.session.username) {
        return res.send(req.session.username);
    } else {
        return res.sendStatus(401);
    }
});

app.delete("/logout", (req, res) => {
    if (!req.session.username) {
        return res.sendStatus(422);
    }
    req.session.username = undefined;
    res.send("success")
});



app.listen(port, () => {
    console.log("up n running")
});