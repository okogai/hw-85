import express from "express";
import TrackHistory from "../models/TrackHistory";
import {Error} from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

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