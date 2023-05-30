import path from 'path';

import { addNewBait, getAllBaits, getBaitByLabel } from '../../models/baits.model.js';
import { uploadPath, uploadName, uploadType, validateUploadSize, validateUploadType } from '../../services/upload.js';

export async function httpAddNewBait(req, res) {
    const baitIcon = req.files.icon;
    const baitLabel = req.body.label;
    
    if (!baitLabel || !baitIcon) {
        return res.status(400).json({
            error: 'Missing required fields!'
        });
    }

    if (!validateUploadSize(baitIcon.size)) {
        return res.status(400).json({
            error: 'Upload icon max size id 5Mb!'
        });
    }

    if (!validateUploadType(uploadType(baitIcon.name))) {
        return res.status(400).json({
            error: 'Upload icon wrong format!'
        });
    }

    if (await getBaitByLabel(baitLabel)) {
        return res.status(409).json({ error: 'Bait already taken!' });
    }
    
    const baitIconName = uploadName(baitIcon);
    await baitIcon.mv(
        path.join(uploadPath, baitIconName)
    );
    
    const bait = {
        label: baitLabel,
        iconUrl: `${process.env.SERVER_URL}/uploads/${baitIconName}`
    }
    await addNewBait(bait);

    return res.status(201).json(bait);
}

export async function httpGetAllBaits(req, res) {
    return res.json(await getAllBaits());
}
