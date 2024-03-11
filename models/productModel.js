const Product = require('../schema/products'); 
const { faker } = require('@faker-js/faker');




const addProduct = (productData) => {
    const newProduct = new Product({
       
        name: productData.name,
        category: productData.category,
        image: productData.image || faker.image.imageUrl(), 
        new_price: productData.new_price,
        old_price: productData.old_price
    });
    return newProduct.save();
}

const getProducts = (limit = '12', offset = '0') => {
    return Product.find().limit(parseInt(limit)).skip(parseInt(offset));
}


const getProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.error(`Erreur lors de la recherche du produit avec l'ID ${id}:`, error);
        throw error;
    }
}


const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        return product;
    } catch (error) {
        console.error(`Erreur lors de la suppression du produit avec l'ID ${id}:`, error);
        throw error;
    }
}

const updateProduct = async (id, productData) => {
    try {
        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        return product;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du produit avec l'ID ${id}:`, error);
        throw error;
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
};
