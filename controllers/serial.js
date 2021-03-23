// const Serial = require('../models/Serial')
const Serial = require('../models/Product')

const errorHandler = require('../utils/errorHandler')
module.exports.getAll = async function(req, res) {
    try {
        const serials = await Serial.find({})
        res.status(200).json(serials)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const serial = await Serial.findById(req.params.id)
        res.status(200).json(serial)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Serial.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const serial = await new Serial({
            name: req.body.name,
            imageSrc: req.file ? req.file.path : '',
            genre: req.body.genre,
            year: req.body.year,
            description: req.body.description,
            actor: req.body.actor,
            rating: req.body.rating,
            producer: req.body.producer,
            serialSrc: req.body.serialSrc,
            prod: req.body.prod
        }).save()
        res.status(201).json(serial)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name,
        genre: req.body.genre,
        year: req.body.year,
        description: req.body.description,
        actor: req.body.actor,
        rating: req.body.rating,
        producer: req.body.producer,
        serialSrc: req.body.serialSrc,
        prod: req.body.prod
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const serial = await Serial.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(serial)
    } catch (e) {
        errorHandler(res, e)
    }
}