const express = require("express");
const cors = require("cors");
const router = require("./router/router.js");
const session = require("express-session");
const sessionStore = require("./mysqlStore.js");
const mySecret = crypto.randomUUID();

//  MY APP
const app = express();

//  SETTERS
app.set("port", process.env.PORT || 3000);

//  MIDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

//    COOKIES
app.use(
  session({
    key: "user_cookie",
    secret: mySecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

//  ROUTER
app.use(router);

// OUT
app.listen(app.get("port"), () => console.log("Server on"));
