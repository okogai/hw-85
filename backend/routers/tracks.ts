import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

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


tracksRouter.post('/', auth, permit('user'), async (req, res, next) => {
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

tracksRouter.delete('/:id', auth, permit('user'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({ error: 'Track not found!' });
            return;
        }

        if (user.role !== 'admin') {
            if (!track.creator.equals(user._id)) {
                res.status(403).send({ error: 'Access denied' });
                return;
            }

            if (track.isPublished) {
                res.status(400).send({ error: 'Cannot remove track. Already published' });
                return;
            }
        }

        await track.deleteOne({ album: track._id });

        res.send({ message: 'Track deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;