import { Router } from "express";
import { conectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

router.get("/", async (req, res) => {
  conectDb();

  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  conectDb();

  const { name, email, password } = req.body;

  const encriptedPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    const newUserDoc = await User.create({
      name,
      email,
      password: encriptedPassword,
    });
    res.status(201).json(newUserDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  conectDb();
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      const { name, _id } = userDoc;

      if (passOk) {
        res.json({ _id, name, email });
      } else {
        res.status(400).json("Senha inválida");
      }
    } else {
      res.status(404).json("Usuário não encontrado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
