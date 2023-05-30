import path from 'path';

import { addNewWater, getAllWaters, getWaterByLabel } from '../../models/waters.model.js';
import { uploadPath, uploadName, uploadType, validateUploadSize, validateUploadType } from '../../services/upload.js';

export async function httpAddNewWater(req, res) {
    const water = req.body;
    const waterPhotos = req.files.photos;
    
    if (!water.label || !water.lat || !water.long || !waterPhotos) {
        return res.status(400).json({
            error: 'Missing required fields!'
        });
    }

    if (await getWaterByLabel(water.label)) {
        return res.status(409).json({ error: 'Water already taken!' });
    }

    water.photoUrls = [];

    for (const photo of waterPhotos) {
        if (!validateUploadSize(photo.size)) {
            return res.status(400).json({
                error: 'Upload photo max size id 5Mb!'
            });
        }
    
        if (!validateUploadType(uploadType(photo.name))) {
            return res.status(400).json({
                error: 'Upload photo wrong format!'
            });
        }

        const waterPhotoName = uploadName(photo);
        await photo.mv(
            path.join(uploadPath, waterPhotoName)
        );

        water.photoUrls.push(`${process.env.SERVER_URL}/uploads/${waterPhotoName}`);
    }

    await addNewWater(water);

    return res.status(201).json(water);
}

export async function httpGetAllWaters(req, res) {
    return res.json(await getAllWaters());
}
