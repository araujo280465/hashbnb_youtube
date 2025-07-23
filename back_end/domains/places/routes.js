import { Router } from "express";
import Place from "./model.js";
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { downloadImage } from "../../utils/imageDownloader.js";
import { __dirname } from "../../server.js";
// AI instructions
import path from "path";

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

router.post("/upload/link", async (req, res) => {
  const { link } = req.body;

  try {
    // AI instructions
    const destination = path.join(__dirname, "tmp") + path.sep;
    const filename = await downloadImage(link, destination);
    //await downloadImage(link, `${__dirname}/tmp/`);

    res.json(filename);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao baixar a imagem!");
  }
});

export default router;
