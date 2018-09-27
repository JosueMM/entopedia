const router = require('express').Router();
const db = require('../config/database').Connection;
const auth = require('../middlewares/auth');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config/config');

router.post('/user', (req, res) => {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    db.query(sql, (err, user) => {
        if (err) return next(err);
       // if (user.length < 1) return res.status(404).send('Not found.');
        //console.log(user);
        let token = jwt.sign({ user }, config.secret, { expiresIn: '2h' }, (err, token) => {
            res.json({ token, user });
        });
    });
});

module.exports = router;