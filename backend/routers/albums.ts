import express from "express";
import Album from "../models/Album";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    const { artist } = req.query;

    try {
        let albums;

        if (artist) {
            albums = await Album.find({ artist })
                .sort({ year: -1 })
                .populate('artist');
        } else {
            albums = await Album.find().sort({ year: -1 });
        }

        const albumsWithTrackCount = await Promise.all(
            albums.map(async (album) => {
                const trackCount = await Track.countDocuments({ album: album._id }).exec();
                return {
                    ...album.toObject(),
                    trackCount
                };
            })
        );

        res.send(albumsWithTrackCount);

    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).sort({ year: -1 }).populate('artist');
        if (!album) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }

        const trackCount = await Track.countDocuments({ album: album._id }).exec();

        const albumsWithTrackCount = {
            ...album.toObject(),
            trackCount
        };

        res.send(albumsWithTrackCount);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', imagesUpload.single('cover'), auth, permit('user'), async (req, res, next) => {
    const { title, artist, year } = req.body;
    const cover = req.file ? `public/images/${req.file.filename}` : null;

    const user = (req as RequestWithUser).user;

    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    if (mongoose.Types.ObjectId.isValid(artist)) {
       const artist = await Artist.findById(req.body.artist);
       if (!artist) res.status(404).send('Artist not found');
    } else {
        res.status(400).send({ error: 'Invalid artist ID' });
        return;
    }

    try {
        const album = new Album({ title, artist, year, cover, creator: user._id });
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth, permit('user'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            res.status(404).send({ error: 'Album not found!' });
            return;
        }

        if (user.role !== 'admin') {
            if (!album.creator.equals(user._id)) {
                res.status(403).send({ error: 'Access denied' });
                return;
            }

            if (album.isPublished) {
                res.status(400).send({ error: 'Cannot remove album. Already published' });
                return;
            }
        }

        await Track.deleteMany({ album: album._id });

        await album.deleteOne();

        res.send({ message: 'Album and all related tracks deleted successfully' });
    } catch (e) {
        next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            res.status(404).send({ error: 'Album not found!' });
            return;
        }

        album.isPublished = !album.isPublished;
        await album.save();

        res.send({ message: `Album ${album.isPublished ? 'published' : 'unpublished'} successfully`, album });
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;