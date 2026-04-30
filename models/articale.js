const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articalschema = new Schema({
   title : String ,
   body : String ,
   numberOflikes: Number

});

const Articale = mongoose.model("Articale",articalschema);

module.exports = Articale;