import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import mongoose from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    const { album, artist } = req.query;

    try {
        if (album) {
            const tracks = await Track.find({ album })
                .sort({ trackNumber: 1 })
                .populate({
                    path: 'album',
                    populate: { path: 'artist' },
                });
            res.send(tracks);
            return;
        }

        if (artist) {
            const albums = await Album.find({ artist });
            const tracks = await Track.find({ album: { $in: albums.map(album => album._id) } })
                .sort({ trackNumber: 1 })
                .populate({
                    path: 'album',
                    populate: { path: 'artist' },
                });
            res.send(tracks);
            return;
        }

        const results = await Track.find()
            .sort({ trackNumber: 1 })
            .populate({
                path: 'album',
                populate: { path: 'artist' },
            });
        res.send(results);
    } catch (e) {
        next(e);
    }
});


tracksRouter.post('/', async (req, res, next) => {
    const { title, album, duration, trackNumber } = req.body;

    if (mongoose.Types.ObjectId.isValid(album)) {
        const album = await Album.findById(req.body.album);
        if (!album) res.status(404).send('Album not found');
    } else {
        res.status(400).send({ error: 'Invalid album ID' });
        return;
    }

    try {
        const track = new Track({ title, album, duration, trackNumber });
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;