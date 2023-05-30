import baits from './baits.mongo.js';

export async function addNewBait(baitData) {
    return await baits.findOneAndUpdate({
        label: baitData.label
    }, baitData, {
        upsert: true
    });
}

export async function getAllBaits() {
    return await baits.find({}, {
        '__v': 0
    });
}

export async function getBaitByLabel(label) {
    return await baits.findOne({label}, {
        '__v': 0
    });
}
