const express = require("express");
const { check, query, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    check("name", "Name is not provided").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter a password with more than 6 characters").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    } else {
      try {
        const { name, email, password } = req.body;
        // console.log(name, email, password);
        let user = await User.findOne({ email });
        console.log(user);
        // console.log(user);
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exist" }] });
        }
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        user = new User({
          name,
          email,
          avatar,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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
