const Film = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const films = await Film.find({});
        res.status(200).json(films);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.search = async function (req, res) {
    try {
        const filtered = escapeRegExp(req.params.name);
        const films = await Film.find({name: {$regex: `(?i)^${filtered}`}});
        res.status(200).json(films);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const film = await Film.findById(req.params.id);
        res.status(200).json(film);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Film.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Произведение было удалено.'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function (req, res) {
    try {
        const film = await new Film({
            name: req.body.name,
            type: req.body.type,
            year: req.body.year,
            rating: req.body.rating,
            description: req.body.description,
            trailerSrc: req.body.trailerSrc,
            imageSrc: req.file ? req.file.path : '',
            nameOriginal: req.body.nameOriginal,
            genre: req.body.genre,
            person: req.body.person,
            country: req.body.country,
            director: req.body.director
        }).save();
        res.status(201).json(film);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    const updatedFilm = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        rating: req.body.rating,
        description: req.body.description,
        trailerSrc: req.body.trailerSrc,
        nameOriginal: req.body.nameOriginal,
        genre: req.body.genre,
        person: req.body.person,
        director: req.body.director,
        country: req.body.country
    }
    if (req.file) {
        updatedFilm.imageSrc = req.file.path;
    }
    try {
        const film = await Film.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedFilm},
            {new: true}
        );
        res.status(200).json(film);
    } catch (e) {
        errorHandler(res, e);
    }
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
