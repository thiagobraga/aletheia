'use strict';

const MediaRespository = require('../repository/media');
const Storage = require('@google-cloud/storage');
const dotenv = require('dotenv');
dotenv.config();

const PROJECT_ID = process.env.GC_PROJECT_ID;
const CLOUD_BUCKET = process.env.GC_PROJECT_ID;

module.exports = class MediaController {
    listAll() {
        try {
            return MediaRespository.listAll();
        } catch (error) {
            return error;
        }
    }

    async create(body) {
        try {
            await this.uploadImage(body.file);
            return MediaRespository.create(body);
        } catch (error) {
            return error;
        }
    }

    getClaimId(id) {
        try {
            return MediaRespository.getById(id);
        } catch (error) {
            return error;
        }
    }

    async update(id, body) {
        try {
            return MediaRespository.update(id, body);
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await MediaRespository.delete(id);
            return { message: 'Media successfully deleted' };
        } catch (error) {
            return error;
        }
    }

    async uploadImage(bodyFile) {
        if (!bodyFile) {
            return null;
        }

        const storage = Storage({
            projectId: PROJECT_ID
        });
        const bucket = storage.bucket(CLOUD_BUCKET);

        const gcsname = Date.now() + bodyFile.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: bodyFile.mimetype
            },
            resumable: false
        });

        stream.on('error', (err) => {
            bodyFile.cloudStorageError = err;
            return null;
        });

        stream.on('finish', () => {
            bodyFile.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
                bodyFile.cloudStoragePublicUrl = this.getPublicUrl(gcsname);
                return null;
            });
        });

        return bodyFile.buffer;
    }

    getPublicUrl(filename) {
        return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
    }
};
