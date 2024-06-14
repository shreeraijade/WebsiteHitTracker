import express from "express"
import cors from "cors"
import CookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cors({credentials:true}));
app.use(CookieParser());
app.use(express.urlencoded({extended: true}))

import WebRoutes from "./routes/website.router.js"
app.use("/api/v1/website", WebRoutes)

import CustomerRoutes from "./routes/customer.routes.js"
app.use("/api/v1/customer",CustomerRoutes)

export default app;

