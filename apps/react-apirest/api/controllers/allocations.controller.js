const AllocationsService = require('../services/allocations.service');

class AllocationsController {
    async getAllocations(req, res) {
        const allocationsService = new AllocationsService(req.locals.db);

        let { userId } = req.params;
        let { threshold } = req.query;

        userId = parseInt(userId, 10);
        threshold = parseInt(threshold, 10) || 0;

        /**
         * API1:2019 Broken Object Level Authorization
         * How to prevent: Verify if currently authenticated user has access to requested resource.
         */
        // if (userId !== req.session.userId) {
        //     res.status(401).end();
        // }

        const allocations = await allocationsService.getAllocations(userId, threshold);

        res.status(200).send(allocations);
    }
}

module.exports = AllocationsController;
