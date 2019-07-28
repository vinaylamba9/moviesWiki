const express = require("express");

const router = express.Router();
const PostController = require('../controllers/posts');


router.post("", PostController.createActor);
router.post("/movie", PostController.createMovie);
router.get("/actors", PostController.getActors);
router.get("/movies", PostController.getMovies);
router.get("/edit/:id", PostController.getActor);
router.get("/editMovie/:id", PostController.getMovie);
router.put("/edit/:id", PostController.updateActor);
router.put("/editMovie/:id", PostController.updateMovie);
router.delete("/edit/:id", PostController.deleteActor);
router.delete("/movie/edit/:id", PostController.deleteMovie);

module.exports = router;
