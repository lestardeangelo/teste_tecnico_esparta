import express from "express";
import "express-async-errors";
//import handleAppErrorMiddeware from "./middlewares/handleAppError.middleware";//


const app = express();

app.use(express.json());

app.use("", );

//app.use(handleAppErrorMiddeware);//

export default app;