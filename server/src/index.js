import express from "express";
import cors from "cors";
import router from "./router/router.js";

//  MY APP
const app = express();

//  SETTERS
app.set("port", process.env.PORT || 3000);

//  MIDLEWARES
app.use(express.json());
app.use(cors());

//  ROUTER
app.use(router);

// OUT
app.listen(app.get("port"), () => console.log("Server on"));
