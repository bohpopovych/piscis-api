import mongoose from "mongoose";

const baitsSchema = new mongoose.Schema({
    label: {
        type: String,
        require: true,
    },
    iconUrl: {
        type: String,
        require: true,
    }
})

export default mongoose.model('Bait', baitsSchema);
