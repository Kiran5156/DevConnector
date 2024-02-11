const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, query, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password Required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    } else {
      try {
        const { email, password } = req.body;
        // console.log(name, email, password);
        let user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const payload = {
          user: { id: user.id },
        };
        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
        // res.send({ data: req.body, msg: "User Registered" });
      } catch (err) {
        console.error(err.message);
      }
    }
  }
);

module.exports = router;
