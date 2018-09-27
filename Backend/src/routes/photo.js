const router = require('express').Router();
const photo_controller = require('../controllers/photo_controller');
const auth = require('../middlewares/auth');

router.route('/artropodo')
    .post(auth.verifyToken, photo_controller.save);

//.get(auth.verifyToken, photo_controller.get)
/*
router.route('/photo/:id')
    .get(auth.verifyToken, photo_controller.get_by_id)
    .put(auth.verifyToken, user_controller.update)
    .delete(auth.verifyToken, user_controller.delete);
*/

module.exports = router;