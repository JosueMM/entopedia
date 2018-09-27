const router = require('express').Router();
const calendar_controller = require('../controllers/calendar_controller');
const auth = require('../middlewares/auth');

router.route('/calendar')
    .get(auth.verifyToken, calendar_controller.get)
    .post(auth.verifyToken, calendar_controller.save);

router.route('/calendar/:id')
    .get(auth.verifyToken, calendar_controller.get_by_id)
    .put(auth.verifyToken, calendar_controller.update)
    .delete(auth.verifyToken, calendar_controller.delete);

module.exports = router;