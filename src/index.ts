import { Request, Response } from "express";

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("client/dist"));

const port = process.env.PORT || 8080;

app.get("/api", (req: Request, res: Response) => {
  res.json({ data: "dataa" });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}\n\nhttp://localhost:8080/`);
});
