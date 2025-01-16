import express from "express";
import Artist from "../models/Artist";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {

    try {
        const results = await Artist.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', async (req, res, next) => {
    const { name, photo = null, info = null } = req.body;

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

export default artistsRouter;
