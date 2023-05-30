import fish from './fish.mongo.js';

export async function addNewFish(fishData) {
    return await fish.findOneAndUpdate({
        label: fishData.label
    }, fishData, {
        upsert: true
    });
}

export async function getAllFish() {
    return await fish.find({}, {
        '__v': 0
    });
}

export async function getFishByLabel(label) {
    return await fish.findOne({label}, {
        '__v': 0
    });
}
