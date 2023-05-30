import mongoose from "mongoose";

const watersSchema = new mongoose.Schema({
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true,
    },
    label: {
        type: String,
        require: true,
    },
    photoUrls: {
        type: Array,
        require: true,
    }
})

export default mongoose.model('Water', watersSchema);
