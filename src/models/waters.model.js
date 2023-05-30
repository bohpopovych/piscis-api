import waters from './waters.mongo.js';

export async function addNewWater(waterData) {
    return await waters.findOneAndUpdate({
        label: waterData.label
    }, waterData, {
        upsert: true
    });
}

export async function getAllWaters() {
    return await waters.find({}, {
        '__v': 0
    });
}

export async function getWaterByLabel(label) {
    return await waters.findOne({label}, {
        '__v': 0
    });
}

export async function getWaterByLatLong(lat, long) {
    return await waters.findOne({lat, long}, {
        '__v': 0
    });
}
