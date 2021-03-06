const PersonalityController = require("../api/controller/personalityController");
const Requester = require("../infra/interceptor/requester");

/**
 * The main router object
 */
const router = require("../lib/util").router();

/**
 * GET {domain}/personality
 */
router.get("/", (req, res, next) => {
    const personality = new PersonalityController();
    personality
        .listAll(req.query)
        .then(result => res.send(result))
        .catch(error => {
            next(Requester.internalError(res, error.message));
        });
});

/**
 * POST {domain}/personality
 */
router.post("/", (req, res, next) => {
    const personality = new PersonalityController();
    personality
        .create(req.body)
        .then(result => res.send(result))
        .catch(error => {
            next(Requester.internalError(res, error.message));
        });
});

/**
 * GET {domain}/personality{/id}
 */
router.get("/:id", (req, res, next) => {
    const personality = new PersonalityController();
    personality
        .getPersonalityId(req.params.id, req.query.language)
        .then(async result => {
            res.send(result);
        })
        .catch(error => {
            next(Requester.internalError(res, error.message));
        });
});

router.get("/:id/reviews", (req, res, next) => {
    const personality = new PersonalityController();

    personality
        .getReviewStats(req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            next(res.send(error));
        });
});

/**
 * PUT {domain}/personality{/id}
 */
router.put("/:id", (req, res, next) => {
    const personality = new PersonalityController();
    personality
        .update(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(error => {
            next(Requester.internalError(res, error.message));
        });
});

/**
 * DELETE {domain}/personality{/id}
 */
router.delete("/:id", (req, res, next) => {
    const personality = new PersonalityController();
    personality
        .delete(req.params.id)
        .then(result => res.send(result))
        .catch(error => {
            next(Requester.internalError(res, error.message));
        });
});

module.exports = function(appObj) {
    return {
        path: "/personality",
        api_version: 1,
        router
    };
};
