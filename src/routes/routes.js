const {generateQuestions} = require('../models/subtraction');
const routes = (app) => {
    app.get('/', async (req, res) => res.status(200)
        .send('Welcome to the subtraction api.')
        .end());

    app.get('/subtraction/listquestions', async (req, res) => {
        try {
            //console.log(req);
            const result = generateQuestions(req.query);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    });
};

module.exports = {routes}