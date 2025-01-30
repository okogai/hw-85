import express from "express";
import Artist from "../models/Artist";
import permit from "../middleware/permit";
import auth from "../middleware/auth";
import {imagesUpload} from "../multer";

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

export default artistsRouter;
