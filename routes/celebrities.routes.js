const router = require("express").Router()
const celebrityModel = require('../models/Celebrity.model')

router.get("/", async (req, res, next) => {
  try{
    const celebrities = await celebrityModel.find()
    res.render("celebrities/celebrities", {celebrities})
  }
  catch{
    next()
  }
})

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity")
})

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  try {
    await celebrityModel.create({ name, occupation, catchPhrase })
    res.redirect("/celebrities/")
  } catch {
    res.redirect("celebrities/new-celebrity")
  }
})

module.exports = router
