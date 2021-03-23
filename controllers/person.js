// const Person = require('../models/Person')
const Person = require('../models/Person');

const errorHandler = require('../utils/errorHandler');

module.exports.getById = async function(req, res) {
    try {
        const person = await Person.findById(req.params.id);
        res.status(200).json(person);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const persons = await Person.find({});
        res.status(200).json(persons);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const person = await new Person({
            nameRu: req.body.nameRu,
            nameOriginal: req.body.nameOriginal,
            specialty: req.body.specialty,
            dob: req.body.dob,
            products: req.body.products,
            imageSrc: req.file ? req.file.path : ''
        }).save();
        res.status(201).json(person);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Person.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Человек был удален.'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        nameRu: req.body.nameRu,
        nameOriginal: req.body.nameOriginal,
        specialty: req.body.specialty,
        dob: req.body.dob,
        products: req.body.products
    };
    if (req.file) {
        updated.imageSrc = req.file.path;
    }
    try {
        const person = await Person.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(person);
    } catch (e) {
        errorHandler(res, e);
    }
}
