const FeedBack = require('../models/Feedback');

const errorHandler = require('../utils/errorHandler');


module.exports.getAll = async function(req, res) {
    try {
        const feedback = await FeedBack.find({});
        res.status(200).json(feedback);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function(req, res) {
    try {
        const feedback = await FeedBack.findById(req.params.id);
        res.status(200).json(feedback);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await FeedBack.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Отзыв был удалён.'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const feedback = new FeedBack({
            sender: req.body.sender,
            message: req.body.message
        }).save();
        res.status(201).send(feedback);
    } catch (e) {
        errorHandler(res, e);
    }
}
