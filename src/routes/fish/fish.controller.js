import path from 'path';

import { addNewFish, getAllFish, getFishByLabel } from '../../models/fish.model.js';
import { uploadPath, uploadName, uploadType, validateUploadSize, validateUploadType } from '../../services/upload.js';

export async function httpAddNewFish(req, res) {
    const fishIcon = req.files.icon;
    const fishLabel = req.body.label;
    
    if (!fishLabel || !fishIcon) {
        return res.status(400).json({
            error: 'Missing required fields!'
        });
    }

    if (!validateUploadSize(fishIcon.size)) {
        return res.status(400).json({
            error: 'Upload icon max size id 5Mb!'
        });
    }

    if (!validateUploadType(uploadType(fishIcon.name))) {
        return res.status(400).json({
            error: 'Upload icon wrong format!'
        });
    }

    if (await getFishByLabel(fishLabel)) {
        return res.status(409).json({ error: 'Fish already taken!' });
    }
    
    const fishIconName = uploadName(fishIcon);
    await fishIcon.mv(
        path.join(uploadPath, fishIconName)
    );
    
    const fish = {
        label: fishLabel,
        iconUrl: `${process.env.SERVER_URL}/uploads/${fishIconName}`
    }
    await addNewFish(fish);

    return res.status(201).json(fish);
}

export async function httpGetAllFish(req, res) {
    return res.json(await getAllFish());
}
