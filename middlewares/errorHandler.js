const app = require('../index');

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur serveur s\'est produite';
    res.status(statusCode).send({ error: message });
};