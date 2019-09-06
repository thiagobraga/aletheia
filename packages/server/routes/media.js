'use strict';

const MediaController = require('../api/controller/mediaController');
const Requester = require('../infra/interceptor/requester');

/**
 * The main router object
 */
const router = require('../lib/util').router();

/**
 * GET {domain}/media
 */
router.get('/', (req, res, next) => {
    const media = new MediaController();
    media.listAll()
    .then(result => res.send(result))
    .catch((error) => {
        next(Requester.internalError(res, error.message));
    });
});

/**
 * POST {domain}/media
 */
router.post('/', (req, res, next) => {
    const media = new MediaController();
    media.create(req.body)
    .then(result => res.send(result))
    .catch((error) => {
        next(Requester.internalError(res, error.message));
    });
});

/**
 * GET {domain}/media{/id}
 */
router.get('/:id', (req, res, next) => {
    const media = new MediaController();
    media.getMediaId(req.params.id)
    .then(result => res.send(result))
    .catch((error) => {
        next(Requester.internalError(res, error.message));
    });
});

/**
 * PUT {domain}/media{/id}
 */
router.put('/:id', (req, res, next) => {
    const media = new MediaController();
    media.update(req.params.id, req.body)
    .then(result => res.send(result))
    .catch((error) => {
        next(Requester.internalError(res, error.message));
    });
});

/**
 * DELETE {domain}/media{/id}
 */
router.delete('/:id', (req, res, next) => {
    const media = new MediaController();
    media.delete(req.params.id)
    .then(result => res.send(result))
    .catch((error) => {
        next(Requester.internalError(res, error.message));
    });
});

module.exports = function(appObj) {
    return {
        path: '/media',
        api_version: 1,
        router
    };
};
