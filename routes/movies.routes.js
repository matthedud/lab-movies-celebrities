const router = require("express").Router()
const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model')

router.get("/", async (req, res, next) => {
  try{
    const movies = await MovieModel.find()
    res.render("movies/movies", {movies})
  }
  catch{ next() }
})

router.get("/:id/edit", async (req, res, next) => {
    const { id } = req.params
    try{
        const celebrities = await CelebrityModel.find()
        const movie = await MovieModel.findById(id)
      res.render("movies/edit-movie", {movie,celebrities})
    }
    catch{
      next()
    }
  })


  router.post("/:id/edit", async (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    try {
    await MovieModel.findByIdAndUpdate(id, {title, genre, plot, cast })
      res.redirect("/movies/")
    } catch (error) {
      next(error)
    }
  })

router.post("/:id/delete", async (req, res, next) => {
    const { id } = req.params
    try{
      await MovieModel.findByIdAndDelete(id)
      res.redirect("/movies/")
    }
    catch{
      res.redirect("/movies/")
    }
  })

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try{
      const movie = await MovieModel.findById(id).populate('cast')
      res.render("movies/movie-details", {movie})
    }
    catch{
      next()
    }
  })


router.get("/create", async (req, res, next) => {
    const celebrities = await CelebrityModel.find()
    res.render("movies/new-movie", {celebrities})
})

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body
  try {
    await MovieModel.create({ title, genre, plot, cast })
    res.redirect("/movies")
  } catch {
    res.redirect("movies/new-Movie")
  }
})

module.exports = router
