import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const MAX_SIZE = 5000000;
const ALLOWED_TYPES = ['.png', '.jpg', '.jpeg', '.heic'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const uploadType = uploadName => extname(uploadName);
export const uploadPath = join(__dirname, '..', '..', 'uploads');
export const uploadName = uploadFile => `${uploadFile.md5}${uploadType(uploadFile.name)}`;

export function validateUploadSize(uploadSize) {
    if (uploadSize < MAX_SIZE) {
        return true;
    }

    return false;
}

export function validateUploadType(uploadType) {
    if (ALLOWED_TYPES.includes(uploadType)) {
        return true;
    }

    return false;
}
