//  Add your code here
const mongoose = require('mongoose') 
const Celebrity = require('./Celebrity.model') 

const movieSchema = new mongoose.Schema({
  title : String,
  genre  : String,
  plot  : String,
  cast  : {
    type:[mongoose.Schema.Types.ObjectId],
    ref: Celebrity
  },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie