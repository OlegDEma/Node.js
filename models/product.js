var User = require('./user');
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
    name:String,
    price:Number,
    images:[{
        src:String
    }],
    discount:Boolean,
    discountPersent:Number,
    newPrice:Number,
    category:String,
    subcategory:String,
    description:String,
    characteristics:String,
    reviews:[{
        user: Schema.Types.ObjectId,
        message:String,
        stars:Number
    }],
}));