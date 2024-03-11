const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');

require('dotenv').config();
console.log(process.env.MONGO_DB_CONNECT);
 

mongoose.connect(process.env.MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  
  console.log("Headers:", req.headers);
  res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');s
});


app.post('/products', productController.postProducts);
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProduct);
app.delete('/products/:id', productController.deleteProduct);
app.put('/products/:id', productController.updateProduct);


app.post('/login', userController.login);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


