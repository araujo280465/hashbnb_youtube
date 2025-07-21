import { Router } from "express";
import Place from "./model.js";
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";

const router = Router();

router.post("/", async (req, res) => {
  connectDb();

  const {
    title,
    city,
    photo,
    description,
    extras,
    price,
    perks,
    checkin,
    checkout,
    guests,
  } = req.body;
  try {
    const { _id: owner } = await JWTVerify(req);

    const newPlaceDoc = await Place.create({
      owner,
      title,
      city,
      photo,
      description,
      extras,
      perks,
      price,
      checkin,
      checkout,
      guests,
    });
    res.json(newPlaceDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao criar um novo lugar!");
  }
});

export default router;
