const { Auth, account } = require("../utils/Auth");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const a = await account();
    try {
        await Auth.methods
            .createUser(name, email, password)
            .send({ from: a[0], gas: 6721975 });
        res.json({ message: "User Created" });
    } catch (err) {
        if (err.cause.message.includes("already exist")) {
            res.status(400).json({ message: "User already exists" });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and Password are required" });
    }

    try {
        const u = await Auth.methods.getUser(email).call();
        if (u[2] !== password) {
            throw new Error("Password does not match");
        } else {
            res.json({ name: u[0], email: u[1] });
        }
    } catch (err) {
        if (err.message.includes("Password does not match")) {
            res.status(400).json({ message: err.message });
        } else if (err.cause?.message.includes("User not found")) {
            res.status(400).json({ message: "User not found" });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

const updateName = async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        return res.status(400).json({ message: "Email and Name are required" });
    }
    const a = await account();
    try {
        await Auth.methods.getUser(email).call();
        await Auth.methods
            .updateName(email, name)
            .send({ from: a[0], gas: 6721975 });
        res.json({ message: "Name updated successfully" });
    } catch (err) {
        if (err.cause?.message.includes("User not found")) {
            res.status(400).json({ message: "User not found" });
        }
    }
};

const getUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const u = await Auth.methods.getUser(email).call();
        res.send({ email: u[1], name: u[0] });
    } catch (err) {
        if (err.cause.message.includes("User not found")) {
            res.status(500).json({ message: "User not found" });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

module.exports = { register, login, updateName, getUser };
