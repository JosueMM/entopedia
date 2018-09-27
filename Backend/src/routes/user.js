const router = require('express').Router();
const user_controller = require('../controllers/user_controller');
const auth = require('../middlewares/auth');

router.route('/user')
    .get(auth.verifyToken, user_controller.get)
    .post(auth.verifyToken, user_controller.save);

router.route('/user/:id')
    .get(auth.verifyToken, user_controller.get_by_id)
    .put(auth.verifyToken, user_controller.update)
    .delete(auth.verifyToken, user_controller.delete);

module.exports = router;