import express from "express";
import Artist from "../models/Artist";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Track from "../models/Track";
import Album from "../models/Album";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {

    try {
        const results = await Artist.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('photo'), auth, permit('user'), async (req, res, next) => {
    const { name, info} = req.body;
    const photo = req.file ? `/public/images/${req.file.filename}` : null;

    if (!name) {
        res.status(400).send({ error: 'Field name is required' });
        return;
    }

    try {
        const artist = new Artist({ name, photo, info });
        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});



artistsRouter.delete('/:id', auth, permit('user'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({ error: 'Artist not found!' });
            return;
        }

        if (user.role !== 'admin') {
            if (!artist.creator.equals(user._id)) {
                res.status(403).send({ error: 'Access denied' });
                return;
            }

            if (artist.isPublished) {
                res.status(400).send({ error: 'Cannot remove artist. Already published' });
                return;
            }
        }

        const albums = await Album.find({ artist: artist._id });
        const albumIds = albums.map(album => album._id);

        await Track.deleteMany({ album: { $in: albumIds } });

        await Album.deleteMany({ artist: artist._id });

        await artist.deleteOne();

        res.send({ message: 'Artist and all related albums and tracks deleted successfully' });

    } catch (e) {
        next(e);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({ error: 'Artist not found!' });
            return;
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        res.send({ message: `Artist ${artist.isPublished ? 'published' : 'unpublished'} successfully`, artist });
    } catch (e) {
        next(e);
    }
});

export default artistsRouter;
