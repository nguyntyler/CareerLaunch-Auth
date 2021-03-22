const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const { User } = require("./db/models");

const port = 4000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const user = await User.findOne({
		where: {
			email,
		},
	});

	if (!user) {
		const newUser = await User.create({
			name,
			email,
			password: hash,
		});
		res.send(`User ${name} has been created.`);
	} else {
		res.send("User already exists.");
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
