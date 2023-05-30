import path from 'path';

import { addNewPost, getAllUserPosts } from '../../models/posts.model.js';
import { uploadPath, uploadName, uploadType, validateUploadSize, validateUploadType } from '../../services/upload.js';

export async function httpAddNewPost(req, res) {
    const post = req.body;
    const postPhotos = req.files && req.files.photos || [];

    if (!post.fishId || !post.baitId || !post.waterId || !post.userId) {
        return res.status(400).json({
            error: 'Missing required fields!'
        });
    }

    post.photoUrls = [];

    for (const photo of postPhotos) {
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

        const postPhotoName = uploadName(photo);
        await photo.mv(
            path.join(uploadPath, postPhotoName)
        );

        post.photoUrls.push(`${process.env.SERVER_URL}/uploads/${postPhotoName}`);
    }

    await addNewPost(post);

    return res.status(201).json(post);
}

export async function httpGetAllUserPosts(req, res) {
    return res.json(await getAllUserPosts(req.user));
}
