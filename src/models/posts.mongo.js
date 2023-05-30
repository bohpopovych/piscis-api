import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true,
    },
    fishId: {
        type: Schema.ObjectId,
        ref: 'Fish',
        require: true
    },
    baitId: {
        type: Schema.ObjectId,
        ref: 'Bait',
        require: true
    },
    waterId: {
        type: Schema.ObjectId,
        ref: 'Water',
        require: true
    },
    weight: {
        type: Number,
    },
    lenght: {
        type: Number,
    },
    message: {
        type: String,
    },
    photoUrls: {
        type: Array,
    }
})

export default mongoose.model('Post', postsSchema);
