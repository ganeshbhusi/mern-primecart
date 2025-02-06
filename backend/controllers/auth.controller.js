import User from "../models/auth.model.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const list = await User.findOne({ username, password });
    console.log(list);
    if (list?.username) {
      res.status(200).send({
        status: true,
        data: list[0],
        message: "Loggedin succesfully",
      });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Not found with given credentials" });
    }
  } catch (err) {
    console.log("get login error: ", err);
    res.status(500).send({ status: false, message: err.message });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const list = await User.findOne({ username });
    if (!list.username) {
      res.status(500).send({ status: false, message: "Username exists" });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ status: true, message: "Registered successfully" });
  } catch (err) {
    console.log("Register error: ", err);
    res.status(500).send({ status: false, message: err.message });
  }
};
