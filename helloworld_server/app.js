const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const sequelize=require('./models').sequelize;

sequelize.sync();

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"타인은 지옥이다",
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/member", require("./routes/member"));
app.use("/post", require("./routes/post"));
app.use("/follow", require("./routes/follow"));

app.listen(8080, () => {
    console.log("Server ready");
});