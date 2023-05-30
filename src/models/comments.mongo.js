import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true,
    },
    postId: {
        type: Schema.ObjectId,
        ref: 'Post',
        require: true,
    },
    message: {
        type: String,
        require: true,
    }
})

export default mongoose.model('Comment', commentsSchema);
