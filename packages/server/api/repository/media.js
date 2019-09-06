'use strict';

const Media = require('../model/mediaModel');

const optionsToUpdate = {
    new: true,
    upsert: true
};

/**
 * @class MediaRepository
 */
module.exports = class MediaRepository {
    static listAll() {
        return Media.find({}).lean();
    }

    static create(media) {
        const newMedia = new Media(media);
        return newMedia.save();
    }

    static getById(mediaId) {
        return Media.findById(mediaId);
    }

    static async update(mediaId, mediaBody) {
        try {
            const media = await this.getById(mediaId);
            const newMedia = Object.assign(media, mediaBody);
            const mediaUpdate = await Media.findByIdAndUpdate(
                mediaId,
                newMedia,
                optionsToUpdate
            );
            return mediaUpdate;
        } catch (error) {
            throw error;
        }
    }

    static delete(mediaId) {
        return Media.findByIdAndRemove(mediaId);
    }
};
