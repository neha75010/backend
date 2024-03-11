const mongoose = require('mongoose');
const { Schema } = mongoose;



const productSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']  
  },
  category: {
    type: String,
    required: [true, 'La catégorie est obligatoire'] 
  },
  image: {
    type: String,
    required: [true, 'L\'image est obligatoire']
  },
  new_price: {
    type: Number,
    required: [true, 'Le nouveau prix est obligatoire'] 
  },
  old_price: Number
});


module.exports = mongoose.model('Product', productSchema);