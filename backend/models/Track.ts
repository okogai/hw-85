import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required']
    },
    duration: {
        type: String,
        required: true
    },
    trackNumber: {
        type: Number,
        required: true
    },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;