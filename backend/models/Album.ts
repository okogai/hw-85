import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'] },
    cover: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;