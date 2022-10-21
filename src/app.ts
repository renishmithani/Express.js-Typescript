import express, { Response, Request, NextFunction } from "express";
import todoRoute from "./routes/todo";
import { json } from 'body-parser';

const app = express();

app.use(json());

app.use("/todos", todoRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(5000).json({ message: err.message });
});
app.listen(3000);   
