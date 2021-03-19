const express = require("express");
const helmet = require("helmet");

const port = 4000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	res.send("Data received!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
