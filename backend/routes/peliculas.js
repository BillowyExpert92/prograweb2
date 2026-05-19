const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storagePosters } = require("../config/cloudinary");

const Pelicula = require("../models/pelicula");

const upload = multer({ storage: storagePosters });

router.get("/", async (req, res) => {
  try {
    const peliculas = await Pelicula.find().sort({ titulo: 1 });

    res.json(peliculas);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post(
  "/",
  upload.single("poster"),
  async (req, res) => {
    try {

      const nuevaPelicula = new Pelicula({
        titulo: req.body.titulo,
        categoria: req.body.categoria,
        usuario: req.body.usuario,

        poster: req.file
          ? req.file.path
          : ""
      });

      await nuevaPelicula.save();

      res.status(201).json({
        success: true,
        pelicula: nuevaPelicula
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
);

module.exports = router;