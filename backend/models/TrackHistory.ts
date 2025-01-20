import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Track",
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);
export default TrackHistory;