import express from "express";
import TrackHistory from "../models/TrackHistory";
import {Error} from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const trackHistory = await TrackHistory.find({ user: user._id })
            .populate({
                path: 'track',
                populate: {
                    path: 'album',
                    populate: {
                        path: 'artist',
                    },
                },
            })
            .sort({ datetime: -1 });
        res.send(trackHistory);
    } catch (e) {
        next(e);
    }
});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }
    const { track } = req.body;
    if (!track) {
        res.status(400).send({ error: 'Track ID is required.' });
        return;
    }
    try {
        const trackHistory = new TrackHistory({
            user: user._id,
            track,
        });

        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError){
            res.status(400).send(error);
        }
        next(error);
    }
});

export default trackHistoryRouter;