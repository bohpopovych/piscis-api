import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://127.0.0.1:27017/piscis?directConnection=true&serverSelectionTimeoutMS=2000&appName=piscis';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

export async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
    await mongoose.disconnect();
}