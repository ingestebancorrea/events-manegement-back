import express,{ Express, Request, Response } from "express";
import userRouter from "./src/routes/users";
const port = 8000;

const app:Express = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(userRouter);

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
})