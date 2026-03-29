import express from "express";
import toDoRouter from "./src/routes/todoRouter.js";


const app =express();
const port =3000;

app.use(express.json());

app.use("/api/todos", toDoRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: err.name,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});