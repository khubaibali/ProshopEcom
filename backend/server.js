import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
dotenv.config();

connectDB();
const app = express();
app.use(express.json());
//app.use(express.json); //this allow to use json object in body

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
