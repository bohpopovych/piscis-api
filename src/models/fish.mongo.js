import mongoose from "mongoose";

const fishSchema = new mongoose.Schema({
    label: {
        type: String,
        require: true,
    },
    iconUrl: {
        type: String,
        require: true,
    }
})

export default mongoose.model('Fish', fishSchema);
