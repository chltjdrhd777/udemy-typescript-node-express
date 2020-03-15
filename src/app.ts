import express, { Request, Response, NextFunction } from "express"; //call express
import { json } from "body-parser"; // to make sure there is req.body. initiate by using 'app.use(json())
import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes); // '/todos/ = all requests from todos, when the source path is correct, start todoRoutes

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
