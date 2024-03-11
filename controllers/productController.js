const productModel = require('../models/productModel'); 

const postProducts = async (req, res) => {
    try {
        const { name, category, image, new_price, old_price } = req.body;
        if (!name || !category || !image || !new_price) {
            return res.status(400).send({ error: 'Les informations du produit sont incomplètes' });
        }
        const newProduct = await productModel.addProduct(req.body);
        res.status(200).send({
            message: 'Produit ajouté avec succès',
            data: newProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de l\'ajout du produit', details: err.message });
    }
};


const getProducts = async (req, res) => {
    const {limit, offset} = req.query;
    try {
        const data = await productModel.getProducts(limit, offset);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de la récupération des produits', details: err.message });
    }
};



const getProduct = async (req, res) => {
    try {
        const product = await productModel.getProduct(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Produit non trouvé' });
        }
        res.status(200).send(product);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de la récupération du produit', details: err.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const data = await productModel.deleteProduct(req.params.id);
        if (!data) {
            return res.status(404).send({ error: 'Produit non trouvé' });
        }
        res.status(200).send({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de la suppression du produit', details: err.message });
    }
};



const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).send({ error: 'Produit non trouvé' });
        }
        res.status(200).send(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de la mise à jour du produit', details: err.message });
    }
};


module.exports = {
    postProducts,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};

