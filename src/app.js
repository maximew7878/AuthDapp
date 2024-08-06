const express = require("express");
const authRouter = require("./router/auth.router");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/user", authRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
